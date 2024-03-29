<script>
    import { onMount } from "svelte";

    import Notification from "~/components/Notification";
    import Route from "~/components/Route";
    import Theme from "~/components/Theme";
    import Content from "~/components/modal/Content";
    import Modal from "~/components/modal/Index";
    import Socket from "~/components/Socket";

    import Home from "~/views/Home";
    import Landing from "~/views/Landing";
    import Password from "~/views/Password";
    import CredentialInfo from "~/views/CredentialInfo";
    import Name from "~/views/Name";
    import Splash from "~/views/Splash";
    import Scan from "~/views/Scan";
    import Settings from "~/views/Settings";

    import { SPLASH_SCREEN_TIMEOUT, VERSION } from "~/lib/config";
    import { __WEB__ } from "~/lib/platform";
    import { credentials, hasSetupAccount, dataVersion } from "~/lib/store";
    import {
        prepareBankInformation,
        prepareCompanyInformation,
        prepareInsuranceInformation,
        preparePersonalInformation,
        prepareImmunityInformation,
        prepareVisaInformation,
        prepareFutureCommitmentInformation,
        preparePresentCommitmentInformation,
        prepareCollegeDegreeInformation,
        prepareEmploymentHistory,
        prepareJobOfferInformation
    } from "~/lib/helpers";

    import { retrieveCredential, clearIdentity } from "~/lib/identity";

    import { SchemaNames } from "~/lib/identity/schemas";

    let displayHome = false;
    let splash = true;

    onMount(() => {
        setTimeout(() => {
            splash = false;
        }, SPLASH_SCREEN_TIMEOUT);

        if (!$hasSetupAccount || !$dataVersion || $dataVersion !== VERSION) {
            clearIdentity();
        }

        Promise.all([
            retrieveCredential(SchemaNames.ADDRESS),
            retrieveCredential(SchemaNames.PERSONAL_DATA),
            retrieveCredential(SchemaNames.CONTACT_DETAILS),
            retrieveCredential(SchemaNames.COLLEGE_DEGREE),
            retrieveCredential(SchemaNames.EMPLOYMENT_HISTORY),
            retrieveCredential(SchemaNames.JOB_OFFER),
            retrieveCredential(SchemaNames.TEST_RESULT),
            retrieveCredential(SchemaNames.VISA_APPLICATION),
            retrieveCredential(SchemaNames.COMPANY),
            retrieveCredential(SchemaNames.BANK_ACCOUNT),
            retrieveCredential(SchemaNames.INSURANCE),
            retrieveCredential(SchemaNames.FUTURE_COMMITMENTS),
            retrieveCredential(SchemaNames.PRESENT_COMMITMENTS)
        ]).then(result => {
            const [
                addressCredential,
                personalDataCredential,
                contactDetailsCredential,
                collegeDegreeCredential,
                employmentHistoryCredential,
                jobOfferCredential,
                testResultCredential,
                visaApplicationCredential,
                companyCredential,
                bankCredential,
                insuranceCredential,
                futureCommitmentCredential,
                presentCommitmentCredential
            ] = result;

            if (
                addressCredential &&
                personalDataCredential &&
                contactDetailsCredential
            ) {
                const personalInfo = preparePersonalInformation(
                    addressCredential.credentialSubject,
                    personalDataCredential.credentialSubject,
                    contactDetailsCredential.credentialSubject
                );

                credentials.update(existingCredentials =>
                    Object.assign({}, existingCredentials, {
                        personal: Object.assign(
                            {},
                            existingCredentials.personal,
                            {
                                data: personalInfo
                            }
                        )
                    })
                );
            }
            if (collegeDegreeCredential) {
                credentials.update(existingCredentials =>
                    Object.assign({}, existingCredentials, {
                        collegeDegree: Object.assign(
                            {},
                            existingCredentials.collegeDegree,
                            {
                                data: prepareCollegeDegreeInformation(
                                    collegeDegreeCredential.credentialSubject
                                )
                            }
                        )
                    })
                );
            }
            if (employmentHistoryCredential) {
                credentials.update(existingCredentials =>
                    Object.assign({}, existingCredentials, {
                        employmentHistory: Object.assign(
                            {},
                            existingCredentials.employmentHistory,
                            {
                                data: prepareEmploymentHistory(
                                    employmentHistoryCredential.credentialSubject
                                )
                            }
                        )
                    })
                );
            }
            if (jobOfferCredential) {
                credentials.update(existingCredentials =>
                    Object.assign({}, existingCredentials, {
                        jobOffer: Object.assign(
                            {},
                            existingCredentials.jobOffer,
                            {
                                data: prepareJobOfferInformation(
                                    jobOfferCredential.credentialSubject
                                )
                            }
                        )
                    })
                );
            }
            if (testResultCredential) {
                credentials.update(existingCredentials =>
                    Object.assign({}, existingCredentials, {
                        immunity: Object.assign(
                            {},
                            existingCredentials.immunity,
                            {
                                data: prepareImmunityInformation(
                                    testResultCredential.credentialSubject
                                )
                            }
                        )
                    })
                );
            }
            if (visaApplicationCredential) {
                credentials.update(existingCredentials =>
                    Object.assign({}, existingCredentials, {
                        visa: Object.assign({}, existingCredentials.visa, {
                            data: prepareVisaInformation(
                                visaApplicationCredential.credentialSubject
                            )
                        })
                    })
                );
            }
            if (companyCredential) {
                credentials.update(existingCredentials =>
                    Object.assign({}, existingCredentials, {
                        company: Object.assign(
                            {},
                            existingCredentials.company,
                            {
                                data: prepareCompanyInformation(
                                    companyCredential.credentialSubject
                                )
                            }
                        )
                    })
                );
            }
            if (bankCredential) {
                credentials.update(existingCredentials =>
                    Object.assign({}, existingCredentials, {
                        bank: Object.assign({}, existingCredentials.bank, {
                            data: prepareBankInformation(
                                bankCredential.credentialSubject
                            )
                        })
                    })
                );
            }
            if (insuranceCredential) {
                credentials.update(existingCredentials =>
                    Object.assign({}, existingCredentials, {
                        insurance: Object.assign(
                            {},
                            existingCredentials.insurance,
                            {
                                data: prepareInsuranceInformation(
                                    insuranceCredential.credentialSubject
                                )
                            }
                        )
                    })
                );
            }

            if (futureCommitmentCredential) {
                credentials.update(existingCredentials =>
                    Object.assign({}, existingCredentials, {
                        futureCommitment: Object.assign(
                            {},
                            existingCredentials.futureCommitment,
                            {
                                data: prepareFutureCommitmentInformation(
                                    futureCommitmentCredential.credentialSubject
                                )
                            }
                        )
                    })
                );
            }

            if (presentCommitmentCredential) {
                credentials.update(existingCredentials =>
                    Object.assign({}, existingCredentials, {
                        presentCommitment: Object.assign(
                            {},
                            existingCredentials.presentCommitment,
                            {
                                data: preparePresentCommitmentInformation(
                                    presentCommitmentCredential.credentialSubject
                                )
                            }
                        )
                    })
                );
            }

            displayHome = true;
        });
    });
</script>

<Theme>
    <Socket />
    <Notification />
    {#if splash && __WEB__}
        <Route route="">
            <Splash />
        </Route>
    {:else}
        <Route route="" entry>
            {#if !$hasSetupAccount}
                <Landing />
            {:else if displayHome}
                <Home />
            {/if}
        </Route>
        <Route route="onboarding/landing" home>
            <Landing />
        </Route>
        <Route route="onboarding/name" onboarding>
            <Name />
        </Route>
        <Route route="onboarding/password" onboarding>
            <Password />
        </Route>
        <Route route="onboarding/home" onboarding>
            <Home />
        </Route>
        <Route route="home" home>
            <Home />
        </Route>
        <Route route="menu/credential-info" menu>
            <CredentialInfo />
        </Route>
        <Route route="modal/scan" modal>
            <Scan />
        </Route>
        <Route route="modal/settings" modal>
            <Settings />
        </Route>
    {/if}
    <Modal>
        <Content />
    </Modal>
</Theme>
