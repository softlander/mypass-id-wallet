<script>
    export let text = '';
</script>

<style>
    .container {
        height: 22vh;
        width: 100%;
        padding: 0 8vw;
    }

    .logo {
        text-align: center;
        /* padding: 1vh 8vw 4vh; */
    }

    img  {
        height: 150px;
        width: 117px;
    }

    header > p {
        font-family: 'Metropolis', sans-serif;
        font-weight: bold;
        font-size: 3.5vh;
        line-height: 4.5vh;
        text-align: center;
        color: #131f37;
    }
</style>

<div class="container">
    <div class="logo">
        <img src="mypass-black.svg" alt="" />
    </div>

    <header>
        <p>{text}</p>
    </header>
</div>
