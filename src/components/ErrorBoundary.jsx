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
    console.error("Lim'Elle a rencontré une erreur :", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-xl px-5 py-24 text-center">
          <p className="font-serif text-2xl text-[#1C1917] dark:text-[#FAFAF9]">Un problème est survenu</p>
          <p className="mt-3 text-sm text-[#57534E] dark:text-[#A8A29E]">Rechargez la page. Si le problème persiste, contactez notre conciergerie.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-[#1C1917] dark:bg-[#A16207] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0C0A09]"
          >
            Recharger la page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
