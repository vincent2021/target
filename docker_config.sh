#######################################################
##### Desinstallation de docker installe via brew #####
#######################################################

if [ -d "${HOME}/.brew" ]; then
    if [ -f "${HOME}/bin/docker" ]; then
        echo "Desinstallation de docker"
        brew uninstall docker
    fi
    if [ -f "${HOME}/bin/docker-compose" ];then
        echo "Desinstallation de docker-compose"
        brew uninstall docker-compose
    fi
    if [ -f "${HOME}/bin/docker-machine" ];then
        echo "Desinstallation de docker-machine"
        brew uninstall docker-machine
    fi
fi


#######################################################
##### Verification si docker for mac est installe #####
########## Ouvre le MSC dans le cas contraire #########
#######################################################

if [ ! -d "/Applications/Docker.app" ]; then
    echo "Il faut installer docker via le MSC"
    if [ -d "/Applications/Managed Software Center.app" ]; then
        open /Applications/Managed\ Software\ Center.app
    fi
    exit 1
fi

#######################################################
##### Verifie si les dossiers necessaire a docker #####
########################################################

kill -9 $(ps aux | pgrep Docker)
if [ -d "$HOME/goinfre" ]; then
    rm -rf ~/Library/Containers/com.docker.docker
    rm -rf ~/.docker
    rm -rf /goinfre/${USER}/docker /goinfre/${USER}/agent
    mkdir -p /goinfre/${USER}/docker /goinfre/${USER}/agent
    ln -s /goinfre/${USER}/agent ~/Library/Containers/com.docker.docker
    ln -s /goinfre/${USER}/docker ~/.docker
fi
