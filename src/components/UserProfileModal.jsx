import { X, User, Phone, MapPin, Package, LogOut, ExternalLink, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";

export default function UserProfileModal({ isOpen, onClose, onSelectOrder }) {
  const { user, userOrders, logout } = useAuth();

  if (!isOpen || !user) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "CONFIRMEE":
        return <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">Confirmée</span>;
      case "EXPEDIEE":
        return <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-semibold text-blue-800">Expédiée</span>;
      case "LIVREE":
        return <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-semibold text-green-800">Livrée</span>;
      case "ANNULEE":
        return <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-semibold text-red-800">Annulée</span>;
      default:
        return <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800">En attente</span>;
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
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-[#E8E0D4] bg-[#F8F4EC] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E0D4] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#14261F] text-[#B58A4A]">
              <User size={20} />
            </div>
            <div>
              <h2 className="font-serif text-xl font-normal text-[#2B2620]">{user.fullName}</h2>
              <p className="text-xs text-[#6A5A4A]">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-full p-2 text-[#8A7A6A] hover:bg-[#E8E0D4]/60 hover:text-[#2B2620]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
          
          {/* User Details */}
          <div className="rounded-2xl border border-[#E8E0D4] bg-white p-4 text-xs">
            <h3 className="font-semibold text-[#2B2620]">Mes Coordonnées</h3>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-[#6A5A4A]">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#B58A4A]" />
                <span>{user.phone || "Non renseigné"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#B58A4A]" />
                <span>{user.city || "Non renseignée"}</span>
              </div>
              <div className="flex items-center gap-2 col-span-full">
                <Calendar size={14} className="text-[#B58A4A]" />
                <span>Membre depuis {new Date(user.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</span>
              </div>
            </div>
          </div>

          {/* Orders History */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 font-serif text-base font-normal text-[#2B2620]">
                <Package size={16} className="text-[#B58A4A]" />
                Historique de mes commandes ({userOrders.length})
              </h3>
            </div>

            {userOrders.length === 0 ? (
              <div className="mt-3 rounded-2xl border border-dashed border-[#E8E0D4] bg-white/60 p-6 text-center text-xs text-[#8A7A6A]">
                <p>Vous n'avez pas encore passé de commande avec ce compte.</p>
              </div>
            ) : (
              <div className="mt-3 space-y-3">
                {userOrders.map((ord) => (
                  <div
                    key={ord.reference}
                    className="rounded-2xl border border-[#E8E0D4] bg-white p-4 shadow-2xs transition hover:border-[#B58A4A]/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#2B2620]">{ord.reference}</span>
                        <p className="mt-0.5 text-[11px] text-[#8A7A6A]">
                          {new Date(ord.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      {getStatusBadge(ord.status)}
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-[#E8E0D4]/60 pt-2.5 text-xs">
                      <span className="font-bold text-[#2B2620]">
                        {ord.total?.toLocaleString("fr-FR")} FCFA
                      </span>
                      <div className="flex items-center gap-2">
                        {ord.lookupToken && (
                          <a
                            href={api.invoiceUrl(ord.lookupToken)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B58A4A] hover:underline"
                          >
                            Facture <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-[#E8E0D4] bg-[#F3EDE2]/40 p-4 text-right">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 shadow-2xs transition hover:bg-red-50"
          >
            <LogOut size={14} /> Se déconnecter
          </button>
        </div>

      </div>
    </div>
  );
}
