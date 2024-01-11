export interface State<T> {
  options: T[];
  value?: T;
  activeOption?: T;
  popupOpened?: boolean;
}

export type ActionType =
  | "FOCUS_OPTION"
  | "FOCUS_FIRST_OPTION"
  | "FOCUS_LAST_OPTION"
  | "FOCUS_PEVIOUS_OPTION"
  | "FOCUS_NEXT_OPTION"
  | "FOCUS_PREVIOUS_10TH_OPTION"
  | "FOCUS_NEXT_10TH_OPTION";

export interface Action<T> {
  type: ActionType;
  payload?: Partial<State<T>>;
}

export function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "FOCUS_OPTION":
      return {
        ...state,
        activeOption: action.payload?.activeOption,
      };

    case "FOCUS_FIRST_OPTION":
      if (state.options.length) {
        return {
          ...state,
          activeOption: state.options[0],
        };
      }
      break;

    case "FOCUS_LAST_OPTION":
      if (state.options.length) {
        return {
          ...state,
          activeOption: state.options[state.options.length - 1],
        };
      }
      break;

    case "FOCUS_PEVIOUS_OPTION":
      if (state.options.length && state.activeOption) {
        const index = state.options.findIndex(
          (option) => option === state.activeOption,
        );
        if (index > 0) {
          return { ...state, activeOption: state.options[index - 1] };
        }
      }
      break;

    case "FOCUS_NEXT_OPTION":
      if (state.options.length && state.activeOption) {
        const index = state.options.findIndex(
          (option) => option === state.activeOption,
        );
        if (index > -1 && index < state.options.length - 1) {
          return { ...state, activeOption: state.options[index + 1] };
        }
      }
      break;

    case "FOCUS_PREVIOUS_10TH_OPTION":
      if (state.options.length && state.activeOption) {
        const index = state.options.findIndex(
          (option) => option === state.activeOption,
        );
        if (index >= 0) {
          return {
            ...state,
            activeOption: state.options[Math.max(0, index - 10)],
          };
        }
      }
      break;

    case "FOCUS_NEXT_10TH_OPTION":
      if (state.options.length && state.activeOption) {
        const index = state.options.findIndex(
          (option) => option === state.activeOption,
        );
        if (index >= 0) {
          return {
            ...state,
            activeOption:
              state.options[Math.min(state.options.length - 1, index + 10)],
          };
        }
      }
      break;
  }

  return state;
}
