var sidebarStuff = {
    sidebarContainer: document.getElementById("sidebarContainer"),
    bottomNavBarContainer: document.getElementById("bottomNavBar"),
    removeActiveClass: function(flag) {
        let sidebarButtons = document.getElementsByClassName("sidebarButtons");
        let bottomNavBarButtons = document.getElementsByClassName("bottomNavBarButtons");
        for(let i = 0; i < sidebarButtons.length; i++) {
            sidebarButtons[i].classList.remove("active");
        }
        if(flag) {
            for(let i = 0; i < bottomNavBarButtons.length; i++) {
                bottomNavBarButtons[i].classList.remove("active");
            }
        } 
    },
    init: function() {
        this.bottomNavBarContainer.addEventListener("click", (e) => {
            if(e.target.classList.contains("bottomNavBarButtons")) {
                let searchbar = document.getElementById("searchBox");
                let addRepoButton = document.getElementById("addRepoButton");
                if(searchbar.classList.contains("hide")) searchbar.classList.remove("hide");
                if(!addRepoButton.classList.contains("hide")) addRepoButton.classList.add("hidden");
                loadPage.content.innerHTML = "";
                sidebarStuff.removeActiveClass(true);
                switch(e.target.id) {
                    case "homeButton":
                        e.target.classList.add("active");
                        customRepos.repoEmotes = [];
                        loadPage.loadEmotes()
                        break;
                    case "sourcesButton":
                        e.target.classList.add("active");
                        searchbar.classList.add("hide");
                        addRepoButton.classList.remove("hidden");
                        loadPage.loadCustomRepos();
                        break;
                }
            }
        })
        this.sidebarContainer.addEventListener("click", (e) => {
            if(e.target.classList.contains("sidebarButtons")) {
                document.getElementById("sidebarContainer").classList.toggle("open");
                loadPage.sidebarOpener.classList.toggle("open");
                let searchbar = document.getElementById("searchBox");
                let navBar = document.getElementById("bottomNavBar");
                let addRepoButton = document.getElementById("addRepoButton");
                if(searchbar.classList.contains("hide")) searchbar.classList.remove("hide");
                if(navBar.classList.contains("hide")) navBar.classList.remove("hide");
                if(!addRepoButton.classList.contains("hide")) addRepoButton.classList.add("hidden");
                loadPage.content.innerHTML = "";
                sidebarStuff.removeActiveClass();
                switch(e.target.id) {
                    case "homeButton":
                        e.target.classList.add("active");
                        customRepos.repoEmotes = [];
                        loadPage.loadEmotes();
                        break;
                    case "aboutButton":
                        e.target.classList.add("active");
                        searchbar.classList.add("hide");
                        navBar.classList.add("hide");
                        loadPage.loadAbout()
                        break;
                    case "twitterButton":
                        searchbar.classList.add("hide");
                        navBar.classList.add("hide");
                        location.href = "https://twitter.com/Nitroless_";
                        break;
                    case "discordButton":
                        searchbar.classList.add("hide");
                        navBar.classList.add("hide");
                        location.href = "https://discord.gg/2h88T99sPa";
                        break;
                    case "redditButton":
                        searchbar.classList.add("hide");
                        navBar.classList.add("hide");
                        location.href = "https://reddit.com/r/nitroless";
                        break;
                    case "iOSApp":
                        searchbar.classList.add("hide");
                        navBar.classList.add("hide");
                        location.href = "https://testflight.apple.com/join/6Fd1KOSA";
                        break;
                    case "macOSApp":
                        searchbar.classList.add("hide");
                        navBar.classList.add("hide");
                        location.href = "https://github.com/Nitroless/Mac/releases";
                        break;

                    case "electronApp":
                        searchbar.classList.add("hide");
                        navBar.classList.add("hide");
                        location.href = "https://github.com/Nitroless/Electron/releases";
                        break;
                        
                    case "androidApp":
                        searchbar.classList.add("hide");
                        navBar.classList.add("hide");
                        location.href = "https://github.com/Nitroless/nitroless-android/releases";
                        break;

                }
            }
        });
    }
}
