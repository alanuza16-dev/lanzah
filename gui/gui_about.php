<?php
global $site;
$theme_url = get_template_directory_uri();
?>

<section class="about-section text-center" id="about">
    <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-lg-8">
                <h2 class="contact-title">
                    <?php echo $site['about_title'] ?? '¿Quiénes somos?'; ?>
                </h2>

                <p class="text-white-50">
                    <?php echo $site['about_text'] ?? ''; ?>
                </p>
            </div>
        </div>

        <img
            class="img-fluid d-block mx-auto"
            src="<?php echo $theme_url; ?>/assets/img/logofondo.png"
            alt="Diseño de página web y landing page profesional en Costa Rica"
            style="width: 100%; max-width: 400px; height: auto;"
            loading="lazy"
        />
    </div>
</section>