<?php
global $site;
?>

<header class="masthead lanzah-hero" id="page-top">
    <div class="lanzah-hero-stage" id="lanzahHero">
        <article class="lanzah-hero-panel is-active" data-delay="5000">
            <div class="lanzah-hero-media slide-1"></div>
            <div class="lanzah-hero-shadow"></div>
            <div class="lanzah-hero-content">
                <p class="lanzah-hero-kicker">Desarrollo y crecimiento digital</p>
                <h1 class="text-uppercase hero-title"><?php echo $site['hero_title'] ?? 'Lanzah Enterprise'; ?></h1>
                <h2 class="hero-subtitle text-white-50 mt-3 mb-5"><?php echo $site['hero_subtitle'] ?? 'Impulsa tu negocio al siguiente nivel'; ?></h2>
                <a class="btn btn-primary" href="#about">Ver mas</a>
            </div>
        </article>

        <article class="lanzah-hero-panel" data-delay="5000">
            <div class="lanzah-hero-media slide-2"></div>
            <div class="lanzah-hero-shadow"></div>
            <div class="lanzah-hero-content">
                <p class="lanzah-hero-kicker">Sitios que convierten</p>
                <h1 class="text-uppercase hero-title">Desarrollo Web</h1>
                <h2 class="hero-subtitle text-white-50 mt-3 mb-5">Creamos paginas modernas, rapidas y pensadas para convertir.</h2>
                <a class="btn btn-primary" href="#projects">Ver servicios</a>
            </div>
        </article>

        <article class="lanzah-hero-panel" data-delay="5000">
            <div class="lanzah-hero-media slide-3"></div>
            <div class="lanzah-hero-shadow"></div>
            <div class="lanzah-hero-content">
                <p class="lanzah-hero-kicker">Contenido con estrategia</p>
                <h1 class="text-uppercase hero-title">Marketing Digital</h1>
                <h2 class="hero-subtitle text-white-50 mt-3 mb-5">Gestionamos tus redes sociales con estrategia, contenido y resultados.</h2>
                <a class="btn btn-primary" href="#contact">Contactanos</a>
            </div>
        </article>

        <div class="lanzah-hero-controls">
            <button class="lanzah-hero-arrow" type="button" data-direction="prev" aria-label="Anterior">
                <span>&lsaquo;</span>
            </button>
            <div class="lanzah-hero-dots" aria-label="Seleccionar slide">
                <button class="is-active" type="button" data-slide="0" aria-label="Slide 1"></button>
                <button type="button" data-slide="1" aria-label="Slide 2"></button>
                <button type="button" data-slide="2" aria-label="Slide 3"></button>
            </div>
            <button class="lanzah-hero-arrow" type="button" data-direction="next" aria-label="Siguiente">
                <span>&rsaquo;</span>
            </button>
        </div>
    </div>
</header>
