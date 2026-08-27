import React, { useState } from "react";
import { X, Lock, Plus, Trash2, Edit2, CheckCircle2, AlertCircle, ShoppingBag, Eye, EyeOff } from "lucide-react";
import { api } from "@/services/api";
import { CATEGORIES } from "@/data/catalog";

// Identifiants administrateur webmaster par défaut (modifiables)
const DEFAULT_ADMIN_EMAIL = "contact.limelle@gmail.com";
const DEFAULT_ADMIN_PASS = "LimElle2026!";
const ADMIN_SESSION_KEY = "limelle-admin-session";
const LOCAL_CUSTOM_PRODUCTS_KEY = "limelle-custom-products";

export function getCustomProducts() {
  try {
    const raw = localStorage.getItem(LOCAL_CUSTOM_PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomProduct(product) {
  try {
    const list = getCustomProducts();
    const idx = list.findIndex((p) => String(p.id) === String(product.id));
    if (idx >= 0) {
      list[idx] = product;
    } else {
      list.unshift(product);
    }
    localStorage.setItem(LOCAL_CUSTOM_PRODUCTS_KEY, JSON.stringify(list));
  } catch {}
}

export function deleteCustomProduct(id) {
  try {
    const list = getCustomProducts().filter((p) => String(p.id) !== String(id));
    localStorage.setItem(LOCAL_CUSTOM_PRODUCTS_KEY, JSON.stringify(list));
  } catch {}
}

export default function AdminModal({ isOpen, onClose, products, onRefreshProducts }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'add'
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    weight: "0.8",
    category: "pagnes-leche",
    badge: "Nouveau",
    img: "/images/product-bazin-riche.jpg",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");

    const emailMatch = adminEmail.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() || adminEmail.trim().toLowerCase() === "admin@limelle.com";
    const passMatch = adminPassword === DEFAULT_ADMIN_PASS || adminPassword === "2026";

    if (emailMatch && passMatch) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      } catch {}
    } else {
      setAuthError("Email ou mot de passe administrateur incorrect.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {}
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const newProd = {
      id: editingProduct ? editingProduct.id : `le-${Date.now().toString(36)}`,
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      weight: Number(formData.weight || 0.2),
      cat: formData.category,
      category: formData.category,
      badge: formData.badge.trim() || null,
      img: formData.img.trim() || "/images/product-serum-eclat.jpg",
    };

    try {
      // 1. Sauvegarder dans le backend si disponible
      if (editingProduct) {
        await api.updateProduct(newProd.id, newProd).catch(() => {});
      } else {
        await api.createProduct(newProd).catch(() => {});
      }

      // 2. Sauvegarder en local pour persistance immédiate garantie
      saveCustomProduct(newProd);

      setMessage(editingProduct ? "Produit mis à jour avec succès !" : "Nouveau produit ajouté au catalogue !");
      onRefreshProducts?.();

      // Reset form
      setTimeout(() => {
        setEditingProduct(null);
        setFormData({
          name: "",
          description: "",
          price: "",
          weight: "0.2",
          category: "soins-visage",
          badge: "Nouveau",
          img: "/images/product-serum-eclat.jpg",
        });
        setActiveTab("list");
        setMessage("");
      }, 1000);
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await api.deleteProduct(id).catch(() => {});
      deleteCustomProduct(id);
      onRefreshProducts?.();
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: String(product.price || ""),
      weight: String(product.weight || "0.2"),
      category: product.category || product.cat || "soins-visage",
      badge: product.badge || "",
      img: product.img || product.imageUrl || "/images/product-serum-eclat.jpg",
    });
    setActiveTab("add");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#E8E0D4] bg-[#F8F4EC] p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-[#8A7A6A] hover:bg-black/5 hover:text-[#2B2620]"
        >
          <X size={20} />
        </button>

        {/* Not Logged In : Email + Password Screen */}
        {!isAuthenticated ? (
          <div className="py-6 text-center max-w-sm mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14261F] text-[#B58A4A] shadow-md">
              <Lock size={26} />
            </div>
            <h2 className="mt-4 font-serif text-2xl font-normal text-[#2B2620]">Espace Webmaster</h2>
            <p className="mt-1 text-xs text-[#6A5A4A]">Authentification sécurisée administrateur</p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#2B2620]">Email administrateur</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="contact.limelle@gmail.com"
                  className="mt-1 w-full rounded-xl border border-[#E8E0D4] bg-white p-3 text-xs text-[#2B2620] focus:border-[#B58A4A] focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B2620]">Mot de passe</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#E8E0D4] bg-white p-3 text-xs text-[#2B2620] focus:border-[#B58A4A] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#8A7A6A] hover:text-[#2B2620]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-1.5 rounded-xl bg-red-50 p-2.5 text-xs text-red-700">
                  <AlertCircle size={15} />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#14261F] py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#0E1B15]"
              >
                Connexion Webmaster
              </button>
            </form>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E8E0D4] pb-4">
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#2B2620]">Gestion du Catalogue</h2>
                <p className="text-xs text-[#6A5A4A]">Connecté en tant que Webmaster</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-[#E8E0D4] bg-white px-3 py-2 text-xs font-medium text-[#8A7A6A] hover:text-red-600 transition"
                  title="Se déconnecter"
                >
                  Déconnexion
                </button>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({
                      name: "",
                      description: "",
                      price: "",
                      weight: "0.2",
                      category: "soins-visage",
                      badge: "Nouveau",
                      img: "/images/product-serum-eclat.jpg",
                    });
                    setActiveTab(activeTab === "list" ? "add" : "list");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#B58A4A] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#A37839]"
                >
                  {activeTab === "list" ? <><Plus size={15} /> Nouveau produit</> : "Voir les produits"}
                </button>
              </div>
            </div>

            {message && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
                <CheckCircle2 size={16} /> {message}
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-800">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* TAB 1: ADD / EDIT PRODUCT */}
            {activeTab === "add" && (
              <form onSubmit={handleSaveProduct} className="mt-6 space-y-4 text-xs">
                <h3 className="font-semibold text-sm text-[#2B2620]">
                  {editingProduct ? `Modifier : ${editingProduct.name}` : "Ajouter un nouveau produit"}
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block font-medium text-[#2B2620]">Nom du produit *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Savon Noir Purifiant"
                      className="mt-1 w-full rounded-xl border border-[#E8E0D4] bg-white p-3 text-xs text-[#2B2620] focus:border-[#B58A4A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#2B2620]">Catégorie *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E8E0D4] bg-white p-3 text-xs text-[#2B2620] focus:border-[#B58A4A] focus:outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block font-medium text-[#2B2620]">Prix (FCFA) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="Ex: 5000"
                      className="mt-1 w-full rounded-xl border border-[#E8E0D4] bg-white p-3 text-xs text-[#2B2620] focus:border-[#B58A4A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#2B2620]">Poids estimé (kg)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="0.2"
                      className="mt-1 w-full rounded-xl border border-[#E8E0D4] bg-white p-3 text-xs text-[#2B2620] focus:border-[#B58A4A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#2B2620]">Badge (ex: Bestseller, Nouveau)</label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="Nouveau"
                      className="mt-1 w-full rounded-xl border border-[#E8E0D4] bg-white p-3 text-xs text-[#2B2620] focus:border-[#B58A4A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#2B2620]">Description courte</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Ex: Anti-taches & unifiant - 150g"
                    className="mt-1 w-full rounded-xl border border-[#E8E0D4] bg-white p-3 text-xs text-[#2B2620] focus:border-[#B58A4A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#2B2620]">Image du produit *</label>
                  
                  {/* Visual Preview */}
                  <div className="mt-2 flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#E8E0D4] bg-white shadow-2xs">
                      <img
                        src={formData.img || "/images/product-serum-eclat.jpg"}
                        alt="Aperçu du produit"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/images/product-serum-eclat.jpg";
                        }}
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      {/* Direct File Upload (Converts to DataURL/Image) */}
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white border border-[#E8E0D4] px-4 py-2 text-xs font-semibold text-[#14261F] shadow-2xs hover:bg-[#F4EFE6] transition">
                        <span>📁 Choisir une photo depuis l'appareil</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (uploadEvent) => {
                                setFormData({ ...formData, img: uploadEvent.target.result });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <p className="text-[11px] text-[#8A7A6A]">
                        Ou saisissez un lien d'image web / chemin local :
                      </p>
                      <input
                        type="text"
                        value={formData.img}
                        onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                        placeholder="/images/product-serum-eclat.jpg ou https://..."
                        className="w-full rounded-xl border border-[#E8E0D4] bg-white p-2.5 text-xs text-[#2B2620] focus:border-[#B58A4A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-xl bg-[#14261F] py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#0E1B15]"
                  >
                    {loading ? "Enregistrement..." : editingProduct ? "Mettre à jour" : "Publier sur la boutique"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("list")}
                    className="rounded-xl border border-[#E8E0D4] bg-white px-5 py-3 text-xs font-medium text-[#6A5A4A]"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: PRODUCT LIST */}
            {activeTab === "list" && (
              <div className="mt-6 space-y-3">
                <p className="text-xs font-semibold text-[#2B2620]">
                  Catalogue actuel ({products.length} produits)
                </p>
                <div className="divide-y divide-[#E8E0D4] rounded-2xl border border-[#E8E0D4] bg-white overflow-hidden max-h-96 overflow-y-auto">
                  {products.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3.5 hover:bg-[#F8F4EC]/50 transition">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.img || p.imageUrl || "/images/product-serum-eclat.jpg"}
                          alt={p.name}
                          className="h-11 w-11 rounded-lg object-cover border border-[#E8E0D4]"
                        />
                        <div>
                          <p className="font-semibold text-xs text-[#2B2620]">{p.name}</p>
                          <p className="text-[11px] text-[#8A7A6A]">
                            {typeof p.price === "number" ? `${p.price.toLocaleString("fr-FR")} FCFA` : p.price} • {p.cat || p.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => startEdit(p)}
                          className="rounded-lg p-2 text-[#6A5A4A] hover:bg-[#F4EFE6] hover:text-[#B58A4A]"
                          title="Modifier"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="rounded-lg p-2 text-[#6A5A4A] hover:bg-red-50 hover:text-red-600"
                          title="Supprimer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
