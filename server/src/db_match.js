const dgraph = require("dgraph-js");
const grpc = require("grpc");
const tool = require("./tool.js");
const SERVER_ADDR = "54.194.192.127:9080";
const SERVER_CREDENTIALS = grpc.credentials.createInsecure();
const clientStub1 = new dgraph.DgraphClientStub(SERVER_ADDR, SERVER_CREDENTIALS);
const ProfilData = `uid
                    username,
                    email,
                    firstname,
                    lastname,
                    dob,
                    city,
                    location,
                    gender,
                    target,
                    text,
                    interest,
                    user_pic,
                    score`;

async function getTarget(uid) {
    dgraphClient = newClient();
    const queryTarget = `{ user(func: uid(${uid})) {
                target
            }
        }`;
    const ret = await dgraphClient.newTxn().query(queryTarget);
    const target = ret.getJson().user[0].target;
    return(target)
}

async function filterUser(uid, age_min, age_max, user_loc, km, score_min, score_max) {
    dgraphClient = newClient();
    let target = await getTarget(uid);
    if (target == "both") {
        target = "male female";
    }

    const query = `{ users(func: anyofterms(gender, "${target}"))
    @filter(near(location, ${user_loc}, ${km})
    AND le(dob, "${age_min}")
    AND ge(dob, "${age_max}")
    AND ge(score, "${score_min}")
    AND le(score, "${score_max}")
    AND NOT uid(${uid})
    AND NOT uid_in(~match, ${uid})
    AND NOT uid_in(~reject, ${uid}))
        {
            ${ProfilData},
        }
    }`;
    console.log(`looking for ${target}, near(location, ${user_loc}, ${km})
    AND age:[${age_min};${age_max}] AND score:[${score_min};${score_max}]`)
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    return (data.users);
}

async function filterVisit(uid) {
    dgraphClient = newClient();
    const query = `{ users(func: has(username)) @filter(uid_in(visit, ${uid}) AND NOT uid(${uid}))
        {    
            ${ProfilData}
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    return (data.users);
}

//Set score + 1
async function setScore(uid, value) {
    dgraphClient = newClient();
    txn = dgraphClient.newTxn();
    try {
        const query = `{ getScore(func: uid(${uid})) {
                score
                }
            }`;
        const res = await dgraphClient.newTxn().query(query);
        const data = res.getJson().getScore;
        let new_score = 50 + value;
        if (data[0] != undefined && (data[0].score + value) >= 1 && (data[0].score + value) <= 100) {
            new_score = data[0].score + value;
        } else if (data[0] != undefined) {
            new_score = data[0].score;
        }
        mu = new dgraph.Mutation();
        mu.setSetNquads(`<${uid}> <score> "${new_score}" .`);
        mu.setCommitNow(true);
        await txn.mutate(mu);
    } finally {
        await txn.discard();
    };
}

//Reject a user
async function reject(uid1, uid2) {
    dgraphClient = newClient();
    let txn = dgraphClient.newTxn();
    //set rejection
    try {
        let mu = new dgraph.Mutation();
        Data = `<${uid1}> <reject> <${uid2}> .
        <${uid2}> <reject> <${uid1}> .`;
        mu.setSetNquads(Data);
        mu.setCommitNow(true);
        await txn.mutate(mu);
    } finally {
        await setScore(uid2, -2);
        await txn.discard();
    };
    return (`Reject from ${uid1} to ${uid2} done`);
}

async function unreject(uid1, uid2) {
    dgraphClient = newClient();
    let txn = dgraphClient.newTxn();
    //set rejection
    try {
        let mu = new dgraph.Mutation();
        Data = `<${uid1}> <reject> <${uid2}> .
        <${uid2}> <reject> <${uid1}> .`;
        mu.setDelNquads(Data);
        mu.setCommitNow(true);
        await txn.mutate(mu);
    } finally {
        await setScore(uid2, +2);
        await txn.discard();
    };
    return (`UnReject from ${uid1} to ${uid2} done`);
}

async function visit(uid1, uid2) {
    dgraphClient = newClient();
    let txn = dgraphClient.newTxn();
    //set rejection
    try {
        let mu = new dgraph.Mutation();
        Data = `<${uid1}> <visit> <${uid2}> .`;
        mu.setSetNquads(Data);
        mu.setCommitNow(true);
        await txn.mutate(mu);
    } finally {
        await setScore(uid2, +1);
        await txn.discard();
    };
    return (`Visit to ${uid2} recorded`);
}

//Match 2 users
async function newMatch(uid1, uid2) {
    dgraphClient = newClient();
    const txn = dgraphClient.newTxn();
    try {
        const mu = new dgraph.Mutation();
        matchData = `<${uid1}> <match> <${uid2}> .`;
        mu.setSetNquads(matchData);
        mu.setCommitNow(true);
        await txn.mutate(mu);
    } finally {
        await txn.discard();
        await setScore(uid2, +2);
    }
    return (`Match from ${uid1} to ${uid2} done`);
}

//unmatch
async function unMatch(uid1, uid2) {
    dgraphClient = newClient();
    const txn = dgraphClient.newTxn();
    try {
        const mu = new dgraph.Mutation();
        matchData = `<${uid1}> <match> <${uid2}> .`;
        mu.setDelNquads(matchData);
        mu.setCommitNow(true);
        await txn.mutate(mu);
    } finally {
        await txn.discard();
    }
    return (`Unlike from ${uid1} to ${uid2} done`);
}

//Return all like for a user
async function getUserMatch(uid) {
    dgraphClient = newClient();   
    const query = `{ getUserLike(func: uid(${uid})) {
            match {
                ${ProfilData}
            }
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    if (data.getUserLike[0]) {
        return data.getUserLike[0].match;
    } else {
        return null;
    }
}

//Return all like for a user
async function getInteraction(uid) {
    dgraphClient = newClient();   
    const query = `{ getInteract(func: uid(${uid})) {
            match {
                ${ProfilData}
            },
            visit {
                ${ProfilData}
            },
            reject {
                ${ProfilData}
            },
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    if (data.getInteract[0]) {
        return data.getInteract[0];
    } else {
        return null;
    }
}

async function getFullMatch(uid) {
    dgraphClient = newClient();   
    const query = `{ userMatch(func: uid(${uid})) {
            match @filter(uid_in(~match, ${uid})) {
                ${ProfilData}
            }
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    if (data.userMatch[0]) {
        return data.userMatch[0].match;
    } else {
        return null;
    }
}

// Create a client.
function newClient() {
    return new dgraph.DgraphClient(clientStub1);
}

module.exports  = {
    newClient: newClient,
    getUserLike: getUserMatch,
    getFullMatch: getFullMatch,
    newMatch: newMatch,
    filterUser: filterUser,
    unMatch: unMatch,
    reject: reject,
    unreject: unreject,
    visit: visit,
    filterVisit: filterVisit,
    getInteraction: getInteraction
}