let body = document.querySelector("body")

body.insertAdjacentHTML("afterbegin" , `<p id="contact">35 Grande rue & 22 av des écuries 95290 L’ISLE ADAM - Email : lilybulle@orange.fr - Téléphone :  01 34 73 18 69</p>
<header>
    <div class="supBoxHeader">
        <div class="socialIcons">
            <a target="blank" href="https://www.facebook.com/Boutique-Lilybulle-564883753528910/?ref=page_internal"><span class="iconify" data-icon="ant-design:facebook-filled" data-inline="false" style="color: black; margin-right: 1em;"></span></a>
            <a target="blank" href="https://www.instagram.com/lilybulle_/"><span class="iconify" data-icon="akar-icons:instagram-fill" data-inline="false" style="color: black;"></span></a>
            <a href="#lieu"><span class="iconify" data-icon="zmdi:google-maps" data-inline="false" style="color: black; margin-left: 1em;"></span></a>
            <a href="./html/contact.html"><span class="iconify" data-icon="entypo:phone" data-inline="false" style="color: black; margin-left: 1em;"></span></a>
        </div>

        <div class="menu1">
            <button type="button" onclick="DisplayMenu()" id="btn-resp"><span class="iconify" id="btn-burger" data-icon="system-uicons:menu-hamburger" data-inline="false"></span></button>

            <div class="full-screen">
                <span class="close">&times;</span>
                <ul>
                    <div>
                        <span class="iconify" data-icon="bi:shop" data-inline="false" style="margin-right: -1.2%;" data-width="2%"></span>
                        <a href="./html/boutique.html"><li>La Boutique</li></a>
                    </div>
                    <div>
                        <span class="iconify" data-icon="emojione-monotone:hammer" data-inline="false" style="margin-right: -1.2%;" data-width="2%"></span>
                        <a href="./html/Atelier.html"><li>L'Atelier</li></a>
                    </div>
                    <div>
                        <span class="iconify" data-icon="map:real-estate-agency" data-inline="false" style="margin-right: -1.2%;" data-width="2%"></span>
                        <a href="./html/agence.html"><li>L'Agence</li></a>
                    </div>
                    <div>
                        <span class="iconify" data-icon="clarity:caravan-line" data-inline="false" style="margin-right: -1.2%;" data-width="2%"></span>
                        <a href="./html/caravaneFood.html"><li>Caravane FOOD</li></a>
                    </div>
                    <div>
                        <span class="iconify" data-icon="grommet-icons:shop" data-inline="false" style="margin-right: -1.2%;" data-width="2%"></span>
                        <a href="#"><li>E-shop</li></a>
                    </div>
                </ul>
            </div>
        </div>
        
        <a id="linkBanderole" href="./index.html"><img id="banderole" src="./Assets/banderoleLilybulle.png" alt="Lilybulle"></a>

        <!--Modal responsive newsletter-->
        <button id="btnModal">Newsletter</button>
        
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <h3  id="respTitleNewsLetter">Abonnez-vous à notre Newsletter</h3>
            <div class="erreurMsg">
                <p></p>
            </div>
            <input type="email" name="email" class="respNewsLetter respMail" placeholder="Votre Email">
            <input onclick="checkIfEmailExistRes()" type="submit" name="submit" class="respNewsLetter respSubmit" value="S'abonner">
            <div id="respSocialIcons">
                <a class="resplinkSN" target="blank" href="https://www.facebook.com/Boutique-Lilybulle-564883753528910/?ref=page_internal"><span class="iconify respIconSN" data-icon="ant-design:facebook-filled" data-inline="false" style="color: black;"></span></a>
                <a class="resplinkSN" target="blank" href="https://www.instagram.com/lilybulle_/"><span class="iconify respIconSN" data-icon="akar-icons:instagram-fill" data-inline="false" style="color: black;"></span></a>
                <a class="resplinkSN" href="index.html#lieu"><span class="iconify respIconSN" data-icon="zmdi:google-maps" data-inline="false" style="color: black; "></span></a>
                <a class="resplinkSN" href="../html/contact.html"><span class="iconify respIconSN" data-icon="entypo:phone" data-inline="false" style="color: black; "></span></a>    
            </div>
          </div>
        
        </div>


        <div id="newsLetterClassic">
            <div class="newsLetter">
                <h3 id="newsLetterTitle">Abonnez-vous à notre Newsletter:</h3>
                <input type="email" name="email" id="newsLetterEmail" size="25" minlength="10" maxlength="40" placeholder="Votre Email">
                <input onclick="checkIfEmailExist()" type="submit" name="submit" id="newsLetterSubmit" value="S'abonner">
            </div>
            <div class="erreurMsg">
                <p></p>
            </div>
        </div>
    </div>
    <div class="infBoxHeader">
        <nav>
            <ul id="navBar">
                <span class="iconify" data-icon="bi:shop" data-inline="false" style="margin-right: -1.2%;" data-width="2%"></span>
                <div class="menu">
                    <a href="./html/boutique.html"><li>La Boutique</li></a>
                    <div class="menuDeroulantBoutique">
                        <div class="premierePartie">
                            <a class="sousCategories" href="./html/boutiqueCategorie/meubles.html">Les Meubles</a>
                            <a class="sousCategories" href="./html/boutiqueCategorie/deco.html">La Décoration</a>
                            <a class="sousCategories" href="./html/boutiqueCategorie/linge.html">Linge de lit</a>
                            <a class="sousCategories" href="./html/boutiqueCategorie/mode.html">Mode & Beauté</a>
                            <a class="sousCategories" href="./html/boutiqueCategorie/enfants.html">Les Enfants</a>
                        </div>
                        <div class="verticalSeparator"></div>
                        <div class="secondePartie">
                            <a class="sousCategories" href="./html/boutiqueCategorie/papeterie.html">Papeterie</a>
                            <a class="sousCategories" href="./html/boutiqueCategorie/outdoor.html">Outdoor</a>
                            <a class="sousCategories" href="./html/boutiqueCategorie/presse.html">Presse-Librairie</a>
                            <a class="sousCategories" href="./html/boutiqueCategorie/tapis.html">Tapis</a>
                            <a class="sousCategories" href="./html/boutiqueCategorie/partenaires.html">Nos Partenaires</a>
                        </div>
                    </div>
                </div>    
                <span class="iconify" data-icon="emojione-monotone:hammer" data-inline="false" style="margin-right: -1.2%;" data-width="2%"></span>
                <div class="menu">
                    <a href="./html/Atelier.html"><li>L'Atelier</li></a>
                    <div class="menuDeroulantAtelier">
                        <a class="sousCategoriesAtelier" href="./html/atelierCategorie/decor.html">Décor de Fenêtre</a>
                        <a class="sousCategoriesAtelier" href="./html/atelierCategorie/siege.html">Réfection Siège</a>
                        <a class="sousCategoriesAtelier" href="./html/atelierCategorie/mur.html">Teinture Murs</a>
                        <a class="sousCategoriesAtelier" href="./html/atelierCategorie/matelas.html">Matelas</a>
                    </div>
                </div>
                <span class="iconify" data-icon="map:real-estate-agency" data-inline="false" style="margin-right: -1.2%;" data-width="2%"></span>
                <div class="menu">
                    <a href="./html/agence.html"><li>L'Agence</li></a>
                    <div class="menuDeroulantAgence">
                        <div class="premierePartie">
                            <a class="sousCategoriesAgence" href="./html/agenceCategorie/deco.html">Conseils Décorations</a>
                            <a class="sousCategoriesAgence" href="./html/agenceCategorie/architecte.html">Architecte d'Intérieure</a>
                            <a class="sousCategoriesAgence" href="./html/agenceCategorie/papierPeint.html">Papier Peint & Peinture</a>
                        </div>
                        <div class="verticalSeparator2"></div>
                        <div class="secondePartie">
                            <a class="sousCategoriesAgence" href="./html/agenceCategorie/cuisine.html">Cuisine & Dressing</a>
                            <a class="sousCategoriesAgence" href="./html/agenceCategorie/canape.html">Canapé</a>
                            <a class="sousCategoriesAgence" href="./html/agenceCategorie/panorama.html">Panorama</a>
                        </div>
                    </div>
                </div>
                <span class="iconify" data-icon="clarity:caravan-line" data-inline="false" style="margin-right: -1.2%;" data-width="2%"></span>
                <div class="menu">
                    <a href="./html/caravaneFood.html"><li>Caravane FOOD</li></a>
                    <div class="menuDeroulantCaravane">
                        <div class="premierePartie">
                            <a class="sousCategoriesCaravane" href="./html/caravanefoodCategorie/epicerie.html">Epicerie Fine</a>
                            <a class="sousCategoriesCaravane" href="./html/caravanefoodCategorie/terasse.html">La Terasse</a>
                            <a class="sousCategoriesCaravane" href="./html/caravanefoodCategorie/the.html">Thé & Infusion</a>
                        </div>
                        <div class="verticalSeparator2"></div>
                        <div class="secondePartie">
                            <a class="sousCategoriesCaravane" href="./html/caravanefoodCategorie/chocolat.html">Nos Chocolats</a>
                            <a class="sousCategoriesCaravane" href="./html/caravanefoodCategorie/spiritueux.html">Nos Spiritueux</a>
                            <a class="sousCategoriesCaravane" href="./html/caravanefoodCategorie/caravaneFood.html">Caravane FOOD</a>
                        </div>
                    </div>
                </div>
                <span class="iconify" data-icon="grommet-icons:shop" data-inline="false" style="margin-right: -1.2%;" data-width="2%"></span>
                <a href="#"><li>E-shop</li></a>

            </ul>
        </nav>
    </div>
</header>`
)