<script>
    import Button from "~/components/Button";
    import ListItem from "~/components/ListItem";
    import { onDestroy } from "svelte";

    import { goto } from "~/lib/helpers";
    import {
        activeCredentialForInfo,
        credentials,
        modalStatus
    } from "~/lib/store";

    let credentialNames = setCredentialNames($credentials);

    const unsubscribe = credentials.subscribe(newCredentials => {
        credentialNames = setCredentialNames(newCredentials);
    });

    function setCredentialNames(_credentials) {
        return Object.keys(_credentials).filter(
            credentialName => _credentials[credentialName].data
        );
    }

    function scan() {
        goto("modal/scan");
    }

    function settings() {
        goto("modal/settings");
    }

    function redirect(credentialName) {
        activeCredentialForInfo.set(credentialName);
        goto("menu/credential-info");
    }

    onDestroy(unsubscribe);

    function getImageSrc(name) {
        if (name === "personal") {
            return "personal-logo.png";
        } else if (name === "collegeDegree") {
            return "degree-logo.png";
        } else if (name === "employmentHistory") {
            return "employment-logo.png";
        } else if (name === "jobOffer") {
            return "job-offer-logo.png";
        } else if (name === "immunity") {
            return "health-authority-logo.png";
        } else if (name === "bank" || name === "insurance") {
            return "sns.png";
        } else if (name === "company") {
            return "government-logo.png";
        } else if (name === "futureCommitment") {
            return "future_foundation.png";
        } else if (name === "presentCommitment") {
            return "present_foundation.png";
        }

        return "border-agency-logo.png";
    }
</script>

<main>
    <div class="settings">
        <button class="settings-button" on:click={settings}>
            <img src="settings.svg" alt="" />
        </button>
    </div>
    <div class="logo">
        <img src="person.png" alt="" />
    </div>

    <header>
        <p>
            {$credentials.personal.data.firstName}
            {$credentials.personal.data.lastName}
        </p>
    </header>
    <section>
        {#each credentialNames as name}
            <div class="list">
                <ListItem
                    type={name}
                    onClick={() => redirect(name)}
                    heading={$credentials[name].heading}
                    subheading={$credentials[name].subheading}
                >
                    <img
                        class="credential-info"
                        src={getImageSrc(name)}
                        alt=""
                    />
                </ListItem>
            </div>
        {/each}

    </section>

    <footer>
        <Button label="Scan Code" onClick={scan}>
            <img src="scan.png" alt="" />
        </Button>
    </footer>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 6vh 7vw;
        background:url("/rectangle.png") repeat-x top/95%;
        background-color: var(--bg);
    }

    header {
        margin-top: 4vh;
        margin-bottom: 5vh;
    }

    section {
        flex: 1;
        align-content: space-between;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }

    .settings {
        display: flex;
        justify-content: flex-end;
        position: absolute;
        width: 100%;
        left: 0;
        top: 18px;
        padding-right: 18px;
        padding-top: env(safe-area-inset-top, 0px);
    }

    .settings-button {
        background: none;
        box-shadow: none;
    }

    .logo {
        margin-top: 2vh;
        margin-bottom: 1vh;
        text-align: center;
    }

    .logo > img {
        width: 15vh;
        height: 15vh;
    }

    .list:not(:last-child) {
        margin-bottom: 3vh;
    }

    .list:last-child {
        margin-bottom: 9vh;
    }

    header > p {
        font-family: "Metropolis", sans-serif;
        font-weight: bold;
        font-size: 6vw;
        line-height: 8vw;
        text-align: center;
        color: #131f37;
    }

    footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 28vh;
        padding: 0 15vw;
        margin-left: auto;
        margin-right: auto;
        max-width: var(--max-width);
    }

    @media (max-width: 139vw) {
        footer {
            bottom: 5vh;
        }
    }

    .credential-info {
        width: 100%;
        background-color: #EA4335;
        border-radius: 100%;
    }
</style>
