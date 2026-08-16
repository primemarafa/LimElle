import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Visible dans la console du navigateur (F12) pour diagnostiquer précisément
    // ce qui a planté, plutôt que de deviner depuis une page blanche.
    console.error("Lim'Elle a rencontré une erreur :", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-xl px-5 py-24 text-center">
          <p className="font-serif text-2xl text-[#3A2E28]">Un problème est survenu</p>
          <p className="mt-3 text-sm text-[#78685D]">Recharge la page. Si le problème persiste, ouvre la console du navigateur (F12) et copie le message d'erreur affiché.</p>
          <button type="button" onClick={() => window.location.reload()} className="mt-6 rounded-full bg-[#96654C] px-6 py-3 text-sm font-bold text-white">Recharger la page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
