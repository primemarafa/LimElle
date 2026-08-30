import { useState } from "react";
import { X, Mail, Lock, User, Phone, MapPin, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal({ isOpen, onClose, defaultMode = "login", onAuthSuccess }) {
  const [mode, setMode] = useState(defaultMode); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Niamey");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    if (mode === "register") {
      if (!fullName.trim()) {
        setError("Veuillez renseigner votre nom complet.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await login({ email, password });
      } else {
        await register({
          email,
          password,
          fullName: fullName.trim(),
          phone: phone.trim(),
          city: city.trim(),
        });
      }
      onAuthSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de l'authentification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#E7E5E4] bg-[#FAFAF9] p-6 shadow-2xl sm:p-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la boîte de dialogue"
          className="absolute top-5 right-5 rounded-full p-2 text-[#78716C] transition hover:bg-[#E7E5E4]/60 hover:text-[#1C1917]"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#1C1917] text-[#A16207] shadow-xs">
            <Sparkles size={20} />
          </div>
          <h2 className="mt-3.5 font-serif text-2xl font-normal text-[#1C1917]">
            {mode === "login" ? "Bienvenue chez Lim'Elle" : "Créer votre compte"}
          </h2>
          <p className="mt-1 text-xs text-[#57534E]">
            {mode === "login"
              ? "Connectez-vous pour retrouver vos commandes et coordonnées."
              : "Rejoignez l'univers Lim'Elle et simplifiez vos commandes."}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="mt-6 flex rounded-xl bg-[#E7E5E4]/60 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
              mode === "login"
                ? "bg-white text-[#1C1917] shadow-xs"
                : "text-[#57534E] hover:text-[#1C1917]"
            }`}
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
              mode === "register"
                ? "bg-white text-[#1C1917] shadow-xs"
                : "text-[#57534E] hover:text-[#1C1917]"
            }`}
          >
            Créer un compte
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium text-[#1C1917]">Nom complet *</label>
              <div className="relative mt-1">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Awa Diallo"
                  className="w-full rounded-xl border border-[#E7E5E4] bg-white py-2.5 pl-9 pr-3 text-xs text-[#1C1917] placeholder:text-[#78716C]/60 focus:border-[#A16207] focus:outline-none focus:ring-1 focus:ring-[#A16207]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#1C1917]">Adresse email *</label>
            <div className="relative mt-1">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
                className="w-full rounded-xl border border-[#E7E5E4] bg-white py-2.5 pl-9 pr-3 text-xs text-[#1C1917] placeholder:text-[#78716C]/60 focus:border-[#A16207] focus:outline-none focus:ring-1 focus:ring-[#A16207]"
              />
            </div>
          </div>

          {mode === "register" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#1C1917]">Téléphone</label>
                <div className="relative mt-1">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+227 90 00 00 00"
                    className="w-full rounded-xl border border-[#E7E5E4] bg-white py-2.5 pl-9 pr-3 text-xs text-[#1C1917] placeholder:text-[#78716C]/60 focus:border-[#A16207] focus:outline-none focus:ring-1 focus:ring-[#A16207]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1C1917]">Ville</label>
                <div className="relative mt-1">
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Niamey, Dakar..."
                    className="w-full rounded-xl border border-[#E7E5E4] bg-white py-2.5 pl-9 pr-3 text-xs text-[#1C1917] placeholder:text-[#78716C]/60 focus:border-[#A16207] focus:outline-none focus:ring-1 focus:ring-[#A16207]"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#1C1917]">Mot de passe *</label>
            <div className="relative mt-1">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#E7E5E4] bg-white py-2.5 pl-9 pr-3 text-xs text-[#1C1917] placeholder:text-[#78716C]/60 focus:border-[#A16207] focus:outline-none focus:ring-1 focus:ring-[#A16207]"
              />
            </div>
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium text-[#1C1917]">Confirmer le mot de passe *</label>
              <div className="relative mt-1">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#E7E5E4] bg-white py-2.5 pl-9 pr-3 text-xs text-[#1C1917] placeholder:text-[#78716C]/60 focus:border-[#A16207] focus:outline-none focus:ring-1 focus:ring-[#A16207]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1C1917] py-3 text-xs font-semibold text-white shadow-md transition hover:bg-[#0C0A09] disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Chargement...</span>
              </>
            ) : mode === "login" ? (
              "Se connecter"
            ) : (
              "Créer mon compte"
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-5 text-center text-[11px] text-[#78716C]">
          {mode === "login" ? (
            <p>
              Pas encore de compte ?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
                className="font-semibold text-[#A16207] hover:underline"
              >
                Inscrivez-vous
              </button>
            </p>
          ) : (
            <p>
              Déjà un compte ?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className="font-semibold text-[#A16207] hover:underline"
              >
                Connectez-vous
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
