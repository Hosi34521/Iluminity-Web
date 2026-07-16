window.ILUMINITY_CATALOG = [
  {
    slug: "roofing",
    name: "Roofing",
    es: "Techos y tejados",
    pt: "Telhados",
    aliases: ["roof", "roofer", "techos", "tejados", "techador", "telhado", "telhados", "telhadista"],
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=900&q=82",
    description: "Webs que convierten búsquedas urgentes en presupuestos.",
    accent: "#ff7849",
    available: true,
    models: ["Apex Roof", "Summit Shield", "Northstar Exteriors"]
  },
  {
    slug: "dental",
    name: "Dental",
    es: "Dentistas",
    pt: "Dentistas",
    aliases: ["dentist", "dentists", "dentista", "dentistas", "odontologia", "odontólogo", "odontologista"],
    image: "/assets/images/dental-consultation.jpg",
    description: "Experiencias limpias para clínicas y especialistas.",
    accent: "#42b7ff",
    available: true,
    models: ["Luma Dental", "Pearl Studio", "Nexa Smile"]
  },
  {
    slug: "hvac",
    name: "HVAC",
    es: "Climatización",
    pt: "Climatização",
    aliases: ["air conditioning", "heating", "aire acondicionado", "calefaccion", "climatizacion", "ar condicionado", "aquecimento", "climatização"],
    image: "/assets/images/hvac-technician.jpg",
    description: "Captación local para refrigeración y climatización.",
    accent: "#00d4ff",
    available: true,
    models: ["Arctic Flow", "AirCore Pro", "Climate One"]
  },
  {
    slug: "realtor",
    name: "Realtor",
    es: "Bienes raíces",
    pt: "Imobiliário",
    aliases: ["realtors", "real estate", "inmobiliaria", "bienes raices", "agente inmobiliario", "imobiliaria", "imóveis", "corretor"],
    image: "/assets/images/realtor-modern-home.jpg",
    description: "Portafolios inmobiliarios con presencia editorial.",
    accent: "#c6a76a",
    available: true,
    models: ["Élan Estates", "Noble Realty", "Atlas Living"]
  },
  {
    slug: "law",
    name: "Law",
    es: "Abogados",
    pt: "Advocacia",
    aliases: ["lawyer", "attorney", "legal", "abogado", "abogados", "bufete", "ley", "advogado", "advogados", "direito"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=82",
    description: "Autoridad, confianza y captación para firmas legales.",
    accent: "#9d8458",
    available: true,
    models: ["Sterling Law", "Vanta Legal", "Hale & Partners"]
  },
  {
    slug: "restaurant",
    name: "Restaurant",
    es: "Restaurantes",
    pt: "Restaurantes",
    aliases: ["restaurants", "food", "restaurante", "restaurantes", "comida", "gastronomia", "culinária"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=82",
    description: "Reservas, menús y narrativa gastronómica.",
    accent: "#e47745",
    available: true,
    models: ["Ember House", "Noir Table", "Oliva Kitchen"]
  },
  {
    slug: "medspa",
    name: "Medspa",
    es: "Estética médica",
    pt: "Estética médica",
    aliases: ["medical spa", "spa", "aesthetic", "estetica", "belleza", "clinica estetica", "estética", "beleza", "clínica estética"],
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=82",
    description: "Estética premium para clínicas de belleza y wellness.",
    accent: "#d59ac8",
    available: true,
    models: ["Aurelia Skin", "Serein Medspa", "Nude Aesthetics"]
  },
  {
    slug: "electrician",
    name: "Electrician",
    es: "Electricistas",
    pt: "Eletricistas",
    aliases: ["electrical", "electricians", "electricista", "electricistas", "electricidad", "eletricista", "eletricistas", "elétrica"],
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=82",
    description: "Servicios eléctricos con conversión inmediata.",
    accent: "#ffd23f",
    available: true,
    models: ["Voltwise", "Current Pro", "Lumen Electric"]
  },
  {
    slug: "plumber",
    name: "Plumber",
    es: "Plomeros",
    pt: "Encanadores",
    aliases: ["plumbing", "plumbers", "plomero", "plomeros", "fontanero", "fontaneria", "encanador", "encanadores", "hidráulica"],
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=82",
    description: "Páginas rápidas para servicios de plomería urgentes.",
    accent: "#278eff",
    available: true,
    models: ["BlueFlow", "PipeCraft", "Rapid Plumb"]
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    es: "Paisajismo",
    pt: "Paisagismo",
    aliases: ["garden", "lawn", "landscaper", "paisajismo", "jardineria", "jardin", "paisagismo", "jardinagem", "jardim"],
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=900&q=82",
    description: "Portafolios visuales para jardines y exteriores.",
    accent: "#5aaa67",
    available: true,
    models: ["Verdant Studio", "Terra & Stone", "Fieldwork"]
  }
];

const publishedAvailability = new Map(
  window.ILUMINITY_CATALOG.map((item) => [item.slug, item.available !== false])
);
const publishedCatalog = new Map(
  window.ILUMINITY_CATALOG.map((item) => [item.slug, item])
);

try {
  const localDraft = JSON.parse(localStorage.getItem("iluminity_catalog_draft") || "null");
  if (Array.isArray(localDraft) && localDraft.length) {
    window.ILUMINITY_CATALOG = localDraft.map((item) => {
      const published = publishedCatalog.get(item.slug);
      const oldImageIds = {
        dental: ["photo-1606811971618-4486d14f3f99", "photos/3884101/"],
        hvac: ["photo-1581092160607-ee22621dd758", "photos/5463587/"],
        realtor: ["photo-1560518883-ce09059eeffa", "photos/7587880/"]
      };
      const needsImageMigration = oldImageIds[item.slug]?.some((id) => String(item.image).includes(id));
      return {
        ...item,
        pt: item.pt || published.pt,
        image: needsImageMigration ? published.image : item.image,
        available: publishedAvailability.get(item.slug) ?? true
      };
    });
  }
} catch (_) {
  // The published catalog remains the safe fallback.
}

window.getIndustry = function (slug) {
  return window.ILUMINITY_CATALOG.find((item) => item.slug === slug);
};
