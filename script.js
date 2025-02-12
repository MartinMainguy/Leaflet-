// Initialiser la carte
var map = L.map('map', {
    center: [48.11, -1.64],
    zoom: 12,
    attributionControl: true
});

// Ajouter des fonds de carte
var baselayers = {
    OSM: L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://esigat.wordpress.com/" target="_blank">Master SIGAT</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank">OSM</a> / Rennes Métropole'
    }),

    ESRI: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png', {
        attribution: '© <a href="https://esigat.wordpress.com/" target="_blank">Master SIGAT</a> / <a href="https://www.esri.com/fr-fr/home" target="_blank">Esri</a> / Rennes Métropole'
    }),

    CartoDB: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://esigat.wordpress.com/" target="_blank">Master SIGAT</a> / <a href="https://carto.com/" target="_blank">CartoDB</a> / Rennes Métropole'
    }),
 
  OrthoRM:L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',{layers: 'raster:ortho2021'}),
  
   PlanRM:L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',{layers: 'ref_fonds:pvci_simple_gris'}),
  
};

// Ajouter le fond de carte par défaut
baselayers.OSM.addTo(map);


// Ajouter l'échelle cartographique
L.control.scale().addTo(map);

// Ajouter une MiniMap
var miniMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png');

var miniMap = new L.Control.MiniMap(miniMapLayer, {
    toggleDisplay: true,
    minimized: false,
    position: 'bottomright'
}).addTo(map);


// Marqueur pour l'Université Rennes 2
var popuprennes2 = `
    <h1>Université Rennes 2</h1>
    <p>Université publique, l’Université Rennes 2 propose des formations en lettres, sciences humaines et sociales.</p>
    <a href="https://www.univ-rennes2.fr/" target="_blank" style="color: #337ab7; text-decoration: none;">Site officiel de l'Université Rennes 2</a>
    <br><br>
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Batiments_de_nuits_-Univ_Rennes_2_-_Louis_Arretche.jpg" width="350px">
    <br>
    <p>Photo: Batiments de nuit - Univ Rennes 2</p>
`;

var customOptions = {
    'maxWidth': '500',
    'className': 'custom-popup',
    'minWidth': '300'
};

var Rennes2icone = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/fr/thumb/2/23/Logo_univ-rennes2-2016.svg/481px-Logo_univ-rennes2-2016.svg.png?20160716141603',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});

var Rennes2 = L.marker([48.119, -1.7013], {icon: Rennes2icone})
    .bindPopup(popuprennes2, customOptions);


// Marqueur pour la Gare de Rennes
var popupGareRennes = `
    <h1>Gare de Rennes</h1>
    <p>La gare de Rennes est une gare importante dans le réseau ferroviaire français.</p>
    <a href="https://www.sncf.com/fr/gares/rennes" target="_blank" style="color: #337ab7; text-decoration: none;">Site officiel de la Gare de Rennes</a>
    <br><br>
    <img src="https://www.groupe-sncf.com/medias-publics/styles/crop_12_5/public/2024-06/gare-rennes-yann-naudic-31072024-ban.jpg.webp?VersionId=qDwB.QSU8RkIXByxTkpYo2fjxxZC55K0&itok=i5bJ703I" width="350px">
    <br>
    <p>Photo: Gare de Rennes</p>
`;

var customOptionsGare = {
    'maxWidth': '500',
    'className': 'custom-popup',
    'minWidth': '300'
};

var GareRennesIcone = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Logo_des_trains_grandes_lignes.png/600px-Logo_des_trains_grandes_lignes.png?20130606230429',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});

var GareRennes = L.marker([48.103, -1.672], {icon: GareRennesIcone})
    .bindPopup(popupGareRennes, customOptionsGare);


// Ajout du cadastre en WMS 
var Cadastre = L.tileLayer.wms('http://geobretagne.fr/geoserver/cadastre/wms',
{layers: 'CP.CadastralParcel',format: 'image/png',transparent: true});

// Ajout des bâtiments en WMS
var Batiment = L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?', {
    layers: 'ref_cad:batiment',
    format: 'image/png',
    transparent: true,
    opacity: 0.3 // Ajout de l'opacité ici
});



// Créer un groupe de marqueurs
var markersGroup = L.layerGroup([Rennes2, GareRennes, Cadastre, Batiment]);

// Gestion des couches pour les marqueurs
var overlayMaps = {
    "Université Rennes 2": Rennes2,
    "Gare de Rennes": GareRennes,
  "Cadastre" : Cadastre,
  "Batiment" : Batiment,
};

// Créer un titre personnalisé pour les fonds de carte
var baselayersControl = L.control.layers(baselayers, null, {
    position: 'topleft',  // Position du menu des fonds de carte à gauche
    collapsed: true
}).addTo(map);

// Ajouter un titre au menu des fonds de carte avec une classe CSS
var baselayersTitle = document.createElement('h3');
baselayersTitle.textContent = 'Fonds de Carte';
baselayersTitle.classList.add('custom-title');
baselayersControl.getContainer().insertBefore(baselayersTitle, baselayersControl.getContainer().firstChild);

// Créer un titre personnalisé pour les icônes
var overlayMapsControl = L.control.layers(null, overlayMaps, {
    position: 'topright',  // Position du menu des icônes en haut à droite
    collapsed: false
}).addTo(map);

// Ajouter un titre au menu des icônes avec une classe CSS
var overlayMapsTitle = document.createElement('h3');
overlayMapsTitle.textContent = '';
overlayMapsTitle.classList.add('custom-title');
overlayMapsControl.getContainer().insertBefore(overlayMapsTitle, overlayMapsControl.getContainer().firstChild);

// Ajout des Stations de vélos
var url = 'https://raw.githubusercontent.com/mastersigat/data/main/velostar.geojson';
$.getJSON(url, function (geojson) {
    var velos = L.geoJson(geojson, {
        // Transformer les marqueurs en points
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.circleMarker(latlng);
        },
        // Modifier la symbologie des points
        style: function (geoJsonFeature) {
            return {
                fillColor: '#001f3f',
                radius: 6,
                fillOpacity: 0.7,
                stroke: false
            };
        }
    }).addTo(map);
  
   // Ajout de Popup avec un style plus petit
    velos.bindPopup(function(velos) {
        console.log(velos.feature.properties);
        return "<h2>Station : " + velos.feature.properties.nom + "</h2>" + 
               "<hr><h3>" + velos.feature.properties.nombreemplacementstheorique + " vélos</h3>";
    }, {
        maxWidth: 200,  // Limite la largeur du popup
        maxHeight: 150,  // Limite la hauteur du popup
        autoPan: true, // Le popup se déplace pour ne pas couper le texte
    });
});