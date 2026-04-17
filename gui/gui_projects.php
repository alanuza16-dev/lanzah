<?php
global $site;
$theme_url = get_template_directory_uri();
?>

<section class="projects-section bg-black" id="projects">
     <div class="container px-4 px-lg-5">
            <!-- TITULO -->
    <div class="text-center mb-5">
        <h2 class="contact-title">Servicios</h2>
        <p class="contact-subtitle">Ofrecemos soluciones tecnológicas integrales diseñadas para impulsar el crecimiento de tu negocio. Nos especializamos en la creación de páginas web profesionales, gestión estratégica de redes sociales y desarrollo de presencia digital orientada a resultados. Nuestro enfoque combina innovación, diseño y funcionalidad para ayudarte a atraer más clientes y fortalecer tu marca en el entorno digital.</p>
    </div>
<section class="catalogo">
    <div class="grid">

        <!-- ITEM 1 -->
        <div class="item" onclick="abrirModal('modal1')">
            <img src="<?php echo $theme_url; ?>/assets/img/web.png" alt="Diseño de página web profesional en Costa Rica" loading ="lazy">
            <div class="overlay">
                <span>+</span>
            </div>
            <h3 class="contact-subtitle"><?php echo $site['project_one_title']?> </h3>
        </div>

        <!-- ITEM 2 -->
        <div class="item" onclick="abrirModal('modal2')">
            <img src="<?php echo $theme_url; ?>/assets/img/redes.jpg" alt="Gestión profesional de redes sociales para empresas, creación de contenido, estrategia digital y crecimiento en plataformas como Facebook e Instagram" loading="lazy">
            <div class="overlay">
                <span>+</span>
            </div>
            <h3 class="contact-subtitle"><?php echo $site['project_two_title']?></h3>
        </div>

        <!-- ITEM 3 -->
        <div class="item" onclick="abrirModal('modal3')">
            <img src="<?php echo $theme_url; ?>/assets/img/consulta.jpeg" alt="Consultoría tecnológica para empresas, optimización de procesos digitales, transformación digital y soluciones innovadoras" loading="lazy">
            <div class="overlay">
                <span>+</span>
            </div>
            <h3 class="contact-subtitle"><?php echo $site['project_three_title']?></h3>
        </div>

    </div>
</section>


<!-- MODALES -->

<div class="modal" id="modal1">
    <div class="modal-content">
        <span class="close" onclick="cerrarModal('modal1')">&times;</span>
        <h2><?php echo $site['project_one_title']?></h2>
        <img src="<?php echo $theme_url; ?>/assets/img/web.png" alt="Diseño de página web profesional en Costa Rica" loading="lazy">
        <p><?php echo $site['project_one_text']?></p>
    </div>
</div>

<div class="modal" id="modal2">
    <div class="modal-content">
        <span class="close" onclick="cerrarModal('modal2')">&times;</span>
        <h2><?php echo $site['project_two_title']?></h2>
        <img src="<?php echo $theme_url; ?>/assets/img/redes.jpg" alt="Gestión profesional de redes sociales para empresas, creación de contenido, estrategia digital y crecimiento en plataformas como Facebook e Instagram" loading="lazy">
        <p><?php echo $site['project_two_text']?></p>       
    </div>
</div>

<div class="modal" id="modal3">
    <div class="modal-content">
        <span class="close" onclick="cerrarModal('modal3')">&times;</span>
        <h2><?php echo $site['project_three_title']?></h2>
        <img src="<?php echo $theme_url; ?>/assets/img/consulta.jpeg" alt="Consultoría tecnológica para empresas, optimización de procesos digitales, transformación digital y soluciones innovadoras" loading="lazy">
        <p><?php echo $site['project_three_text']?></p>
    </div>
</div>
</section>

        