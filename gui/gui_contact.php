<?php
global $site;
?>

<section class="contact-section contact-variant-premium-dark" id="contact">
    <div class="container px-4 px-lg-5">
        <div class="text-center mb-5">
            <h2 class="contact-title">Contáctanos</h2>
            <p class="contact-subtitle">Estamos listos para ayudarte</p>
        </div>

        <div class="row gx-4 gx-lg-5">
            <div class="col-md-4 mb-3 mb-md-0">
                <div class="card py-4 h-100">
                    <div class="card-body text-center">
                        <i class="fas fa-map-marked-alt text-primary mb-2"></i>
                        <h4 class="text-uppercase m-0">Dirección</h4>
                        <hr class="my-4 mx-auto" />
                        <div class="small text-black-50"><?php echo $site['address'] ?? ''; ?></div>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-3 mb-md-0">
                <div class="card py-4 h-100">
                    <div class="card-body text-center">
                        <i class="fas fa-envelope text-primary mb-2"></i>
                        <h4 class="text-uppercase m-0">Correo</h4>
                        <hr class="my-4 mx-auto" />
                        <div class="small text-black-50">
                            <a href="mailto:<?php echo $site['email'] ?? ''; ?>"><?php echo $site['email'] ?? ''; ?></a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-3 mb-md-0">
                <div class="card py-4 h-100">
                    <div class="card-body text-center">
                        <i class="fas fa-mobile-alt text-primary mb-2"></i>
                        <h4 class="text-uppercase m-0">Teléfono</h4>
                        <hr class="my-4 mx-auto" />
                        <div class="small text-black-50">
                            <?php if (!empty($site['phone1'])): ?>
                                <a href="https://wa.me/<?php echo preg_replace('/[^0-9]/', '', $site['phone1']); ?>" target="_blank" rel="noopener noreferrer"><?php echo $site['phone1']; ?></a><br>
                            <?php endif; ?>

                            <?php if (!empty($site['phone2'])): ?>
                                <a href="https://wa.me/<?php echo preg_replace('/[^0-9]/', '', $site['phone2']); ?>" target="_blank" rel="noopener noreferrer"><?php echo $site['phone2']; ?></a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="social d-flex justify-content-center">
            <a class="mx-2" href="#" onclick="openInstagram(); return false;" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a class="mx-2" href="#" onclick="openFacebook(); return false;" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            
        </div>
    </div>
</section>
