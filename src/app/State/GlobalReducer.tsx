import { ModalOptions } from "../Shared/components/Modal";

// ✅ Stato globale
export type GlobalState = {
  hoveredId: string | null;
  cursor: "default" | "pointer" | "grab" | "grabbing";
  modal: ModalOptions | null;
};

// ✅ Azioni globali
export type GlobalAction =
  | { type: "SET_HOVER"; payload: string }
  | { type: "CLEAR_HOVER" }
  | { type: "SET_CURSOR"; payload: "default" | "pointer" | "grab" | "grabbing" }
  | { type: "SHOW_MODAL"; payload: ModalOptions }
  | { type: "HIDE_MODAL" };

// ✅ Reducer
export function globalReducer(state: GlobalState, action: GlobalAction): GlobalState {
  switch (action.type) {
    case "SET_HOVER":
      return { ...state, hoveredId: action.payload };
    case "CLEAR_HOVER":
      return { ...state, hoveredId: null };
    case "SET_CURSOR":
      return { ...state, cursor: action.payload };
    case "SHOW_MODAL":
      return { ...state, modal: action.payload };
    case "HIDE_MODAL":
      return { ...state, modal: null };
    default:
      return state;
  }
}

// ✅ Stato iniziale
export const initialGlobalState: GlobalState = {
  hoveredId: null,
  cursor: "default",
  modal: null,
};
