<script>
    import { onMount } from 'svelte';
    import Hammer from 'hammerjs';

    import { goto } from '~/lib/helpers';
    import path from '~/lib/router';

    onMount(() => {
        if (window.matchMedia('(pointer: coarse)').matches) {
            const hammer = new Hammer(document.body);

            hammer.on('swiperight', () => {
                if ($path === 'credential-info' || $path === 'scan') {
                    goto('home');
                }
                if ($path === 'onboarding/name') {
                    goto('onboarding/landing');
                }
            });
        }
    });
</script>

<style>
    @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Inter Light'), local('Inter-Light'), url('/inter-light.woff2') format('woff2');
    }

    @font-face {
        font-family: 'Metropolis';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: local('Metropolis Bold'), local('Metropolis-Bold'), url('/metropolis-bold.woff2') format('woff2');
    }

    @font-face {
        font-family: 'Metropolis';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local('Metropolis Regular'), local('Metropolis-Regular'), url('/metropolis-regular.woff2') format('woff2');
    }

    :global(body > main) {
        --max-width: 100vw;
        --max-height: 100vh;

        --bg: #fdeceb;
        --bg-secondary: #EA4335;

        --primary: #EA4335;
        --primary-fg: #eff0ff;

        --button-bg: #EA4335;
        --button-fg: #ffffff;

        --input-bg: #ffffff;
        --input-border: #eedcd9;
        --input-placeholder: #9ca1ab;
        --input-active: #bb362a;
        
        --qr: #d21f3c;
        --qr-bg: #EA4335;

        --splash-bg: linear-gradient(91.35deg, white 9.6%, #EA4335 88.79%);
    }

    :global(*, *:after, *:before) {
        margin: 0;
        padding: 0;
        border: 0;
        font-weight: 400;
        box-sizing: border-box;
        outline: none;
    }

    :global(html, body) {
        width: 100%;
        height: 100%;
        background: #e5e5e5;
        font-weight: 400;

        background-size: cover;
        transition: background 0.25s;
    }

    :global(body) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :global(button) {
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        box-shadow: 0px 2px 20px rgba(234, 68, 53, 0.4);
        background: var(--button-bg);
        color: var(--button-fg);
    }

    :global(input, textarea) {
        padding: 0 6vw;
        background: var(--input-bg);
        border-radius: 8vw;
        box-sizing: border-box;
        border: 2px solid var(--input-border);
        -webkit-appearance: none;
        color: var(--input-placeholder);
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-size: 4vw;
        width: 100%;
        height: 8vh;
        line-height: 5vw;
        resize: none;
        transition: border-color 0.12s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :global(input::-ms-clear) {
        display: none;
        width: 0;
        height: 0;
    }

    :global(input:focus) {
        border-color: var(--input-active);
    }

    @media only screen and (max-height: 100vh) {
        :global(input, textarea) {
            margin-bottom: 2vh;
        }
    }

    :global(::placeholder) {
        color: var(--input-placeholder);
        font-size: 2vh;
        font-family: 'Inter', sans-serif;
        font-style: normal;
    }

    @media only screen and (max-height: 100vh) {
        :global(::placeholder) {
            line-height: 3vh;
        }
    }

    @media only screen and (max-height: 100vh) {
        :global(input, textarea) {
            margin-bottom: 2vh;
        }
    }

    @media only screen and (max-height: 100vh) {
        :global(::placeholder) {
            line-height: 3vh;
        }
    }

    :global(label) {
        display: block;
        font-weight: 600;
        margin-bottom: 1vh;
    }

    :global(label span) {
        font-weight: 600;
    }

    :global(svg) {
        overflow: visible;
    }

    :global(body > main) {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        max-width: var(--max-width);
        max-height: var(--max-height);
        background: var(--bg);
        color: var(--fg);
        user-select: none;
        font-size: 3vw;
        line-height: 4vw;
        position: relative;
        box-shadow: 0px 20px 30px 5px rgba(0, 0, 0, 0.25);
    }

    @media (max-width: 140vw) {
        :global(html, body) {
            background: transparent;
        }
        main {
            max-width: 100%;
            max-height: 100%;
            background: none;
        }
    }

    @media only screen and (max-height: 100vh) {
        :global(body) {
            display: block;
        }
    }
</style>

<main>
    <slot />
</main>
