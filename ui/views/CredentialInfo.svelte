<script>
    import { onMount } from "svelte";
    import Button from "~/components/Button";

    import { goto } from "~/lib/helpers";
    import {
        activeCredentialForInfo,
        credentials,
        modalStatus
    } from "~/lib/store";
    import { __IOS__ } from "~/lib/platform";

    const credentialInfo = Object.keys(
        $credentials[$activeCredentialForInfo].data
    ).map(key => ({
        key: [key.replace(/([a-z](?=[A-Z]))/g, "$1 ")],
        value: $credentials[$activeCredentialForInfo].data[key]
    }));

    let logo;

    onMount(() => {
        switch ($activeCredentialForInfo) {
            case "personal":
                logo = "government-logo";
                break;
            case "collegeDegree":
                logo = "degree-logo";
                break;
            case "employmentHistory":
                logo = "employment-logo";
                break;
            case "jobOffer":
                logo = "job-offer-logo";
                break;
            case "company":
                logo = "government-logo";
                break;
            case "bank":
            case "insurance":
                logo = "sns";
                break;
            case "futureCommitment":
                logo = "future_foundation";
                break;
            case "presentCommitment":
                logo = "present_foundation";
                break;
            case "immunity":
                logo = "health-authority-logo";
                break;
            case "visa":
                logo = "border-agency-logo";
        }
    });

    function share() {
        modalStatus.set({ active: true, type: "presentation" });
    }

    function goBack() {
        goto("home");
    }
</script>

<main>
    <div
        class:logo-personal={$activeCredentialForInfo === 'personal'}
        class:logo-collegeDegree={$activeCredentialForInfo === 'collegeDegree'}
        class:logo-employment={$activeCredentialForInfo === 'employmentHistory'}
        class:logo-jobOffer={$activeCredentialForInfo === 'jobOffer'}
        class:logo-immunity={$activeCredentialForInfo === 'immunity'}
        class:logo-visa={$activeCredentialForInfo === 'visa'}
        class:logo-company={$activeCredentialForInfo === 'company'}
        class:logo-bank={$activeCredentialForInfo === 'bank'}
        class:logo-insurance={$activeCredentialForInfo === 'insurance'}
        class:logo-futureCommitment={$activeCredentialForInfo === 'futureCommitment'}
        class:logo-presentCommitment={$activeCredentialForInfo === 'presentCommitment'}
        class="wrapper"
        class:wrapper-ios={__IOS__}
    >
        <img
            class="chevron"
            class:chevron-ios={__IOS__}
            on:click={goBack}
            src="chevron-left.svg"
            alt=""
        />

        <div class="header" class:header-ios={__IOS__}>
            <div class="header" class:header-ios={__IOS__}>
                <img class="credential-logo" src={`${logo}.png`} alt="" />
                <header>
                    <p>{$credentials[$activeCredentialForInfo].heading}</p>
                    <p>{$credentials[$activeCredentialForInfo].subheading}</p>
                </header>
                <ul>
                    {#each credentialInfo as object}
                        {#if object.key[0] && object.key[0] === 'commitments'}
                            {#each object.value as commitment}
                                {#if $activeCredentialForInfo === 'futureCommitment'}
                                    <li>
                                        <p>
                                            Donate {commitment.commitmentWalletPercentage}%
                                            of my wallet balance to support {commitment.commitmentSupport}
                                        </p>
                                    </li>
                                {/if}
                                {#if $activeCredentialForInfo === 'presentCommitment'}
                                    <li>
                                        <p>
                                            I commit to {commitment.commitmentSupport}
                                        </p>
                                    </li>
                                {/if}
                            {/each}
                        {:else}
                            <li>
                                <p>{object.key}</p>
                                <span>{object.value}</span>
                            </li>
                        {/if}
                    {/each}
                </ul>
            </div>
        </div>

        <footer>
            <Button label="Share" onClick={share}>
                <img src="share.png" alt="" />
            </Button>
        </footer>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color: var(--bg);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
    }

    header {
        margin-bottom: 5vh;
    }

    .wrapper {
        text-align: center;
        padding-top: 2vh;
        min-height: 36vh;
    }

    .wrapper-ios {
        min-height: calc(env(safe-area-inset-top) + 36vh);
        min-height: calc(constant(safe-area-inset-top) + 36vh);
    }

    .logo-personal {
        background: #d9381e;
    }

    .logo-immunity {
        background: #1b65d0;
    }

    .logo-collegeDegree {
        background: #ff6347;
    }

    .logo-employment {
        background: #d9381e;
    }

    .logo-jobOffer {
        background: #ff2800;
    }

    .logo-visa {
        background: #102e68;
    }

    .logo-futureCommitment {
        background: #4db6ac;
    }

    .logo-presentCommitment {
        background: #ff7a4c;
    }

    .logo-company,
    .logo-bank,
    .logo-insurance {
        background: linear-gradient(0deg, #92d0f3 -57.14%, #913dd1 207.14%);
    }

    .header {
        position: absolute;
        top: 2vh;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
    }

    .header-ios {
        top: calc(env(safe-area-inset-top) + 2vh);
        top: calc(constant(safe-area-inset-top) + 2vh);
    }

    header > p:nth-child(1) {
        margin-top: 2vh;
        font-family: "Inter", sans-serif;
        font-weight: 1000;
        font-size: 3vw;
        line-height: 4vw;
        color: #fff;
        text-transform: uppercase;
    }

    header > p:nth-child(2) {
        margin-top: 2vh;
        font-family: "Metropolis", sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 6vw;
        line-height: 7vw;
        color: #fff;
    }

    ul {
        background: #fff;
        margin: 3vh 7vw;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
        border-radius: 1vh;
        list-style-type: none;
        text-align: left;
        overflow: auto;

        -webkit-overflow-scrolling: touch;
    }

    li {
        padding: 1.5vh 5vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    li:nth-last-child(n + 2) {
        border-bottom: 1px solid #f1f4fa;
    }

    li > p {
        font-family: "Inter", sans-serif;
        font-weight: 1000;
        font-size: 3vw;
        line-height: 4vw;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: #8593ac;
    }

    li > span {
        font-family: "Metropolis Regular", sans-serif;
        font-weight: 600;
        font-size: 4vw;
        line-height: 6vw;
        color: #131f37;
    }

    footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 28vh;
        padding: 0 20vw;
        margin-left: auto;
        margin-right: auto;
        max-width: var(--max-width);
    }

    @media (max-width: 139vw) {
        footer {
            bottom: 5vh;
        }
    }

    .chevron {
        z-index: 1;
        position: fixed;
        left: 7vw;
        top: 7vh;
    }

    .chevron-ios {
        top: calc(env(safe-area-inset-top) + 5px);
        top: calc(constant(safe-area-inset-top) + 5px);
    }

    .credential-logo {
        width: 15%;
    }
</style>
