<script>
    import QRCode from "qrcode-svg";
    import { onDestroy, onMount, setContext, getContext } from "svelte";

    import { goto, detectSwipeGesture } from "~/lib/helpers";

    import {
        activeCredentialForInfo,
        credentials,
        qrCode,
        modalStatus
    } from "~/lib/store";

    onMount(() => {
        const deviceHeight = document.documentElement.clientHeight;
        qrCode.set(
            new QRCode({
                content: JSON.stringify($credentials.personal.data),
                color: "#13C4A3",
                height: deviceHeight * 0.3,
                width: deviceHeight * 0.3
            }).svg()
        );
        detectSwipeGesture("wrapper", "swipedown", () => goBack());
    });

    function goBack() {
        modalStatus.set({ active: false, type: null });
    }

    function prettyCredentialType(credentialType) {
        switch (credentialType) {
            case "personal":
                return "Personal Details";
            case "immunity":
                return "Test Result";
            case "collegeDegree":
                return "College Degree";
            case "employmentHistory":
                return "Experience Letter";
            case "jobOffer":
                return "Job Offer";
            case "company":
                return "Company";
            case "bank":
                return "Bank Account";
            case "insurance":
                return "Insurance";
            case "futureCommitments":
                return "Future Commitment";
            case "presentCommitments":
                return "Present Commitment";
            default:
                return "Certificate";
        }
    }
</script>

<main id="wrapper">
    <img class="icon" on:click={goBack} src="chevron-left.svg" alt="" />

    <img class="avatar" src="person.png" alt="" />

    <header>
        <p>
            {$credentials.personal.data.firstName}
            {$credentials.personal.data.lastName}
        </p>
    </header>

    <section class="qr">
        <h6>Your {prettyCredentialType($activeCredentialForInfo)}</h6>
        <p>Valid until May 31, 2030</p>

        <div contenteditable="false" bind:innerHTML={$qrCode} />
    </section>
</main>

<style>
    main {
        height: 100%;
        padding: 3vh 8vw;
        background-color: var(--qr-bg);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    header {
        margin: 5vh 0vh;
    }

    header > p {
        font-family: "Metropolis", sans-serif;
        font-weight: bold;
        font-size: 7.5vw;
        line-height: 8vw;
        text-align: center;
        color: #ffffff;
    }

    section > p {
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 800;
        font-size: 3vw;
        line-height: 4vw;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: #8593ac;
    }

    .qr {
        min-height: 50vh;
        width: 100%;
        background: #ffffff;
        box-shadow: 0px 4px 12px #ea4335;
        border-radius: 4vw;
        display: flex;
        padding: 3vh 7vw 2.5vh 7vw;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .icon {
        position: absolute;
        left: 7vw;
        top: 3vh;
    }

    h6 {
        font-family: "Metropolis", sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 5vw;
        line-height: 7vw;
        text-align: center;
        color: #051923;
    }

    .avatar {
        height: 17vh;
        width: 17vh;
    }
</style>
