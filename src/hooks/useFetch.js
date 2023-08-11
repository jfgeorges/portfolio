import { useCallback, useEffect, useReducer } from "react";
import { useIsMounted } from "./useIsMounted";

export const FETCH_STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  REJECTED: "rejected",
  RESOLVED: "resolved",
};

const INITIAL_STATE = { status: FETCH_STATUS.IDLE, data: null, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_STATUS.PENDING:
      return {
        ...state,
        status: FETCH_STATUS.PENDING,
        data: null,
        error: null,
      };
    case FETCH_STATUS.RESOLVED:
      return {
        ...state,
        status: FETCH_STATUS.RESOLVED,
        data: action.data,
        error: null,
      };
    case FETCH_STATUS.REJECTED:
      return {
        ...state,
        status: FETCH_STATUS.REJECTED,
        data: null,
        error: action.error,
      };
    default:
      throw new Error("useFetch reducer - Unknown action :", action.type);
  }
};

export const useFetch = (url, config) => {
  const [{ status, data, error }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );
  const isMounted = useIsMounted();

  const run = useCallback(async () => {
    try {
      if (!isMounted) {
        return;
      }
      dispatch({ type: FETCH_STATUS.PENDING });
      const response = await fetch(url, config);
      const data = await response.json();
      dispatch({ type: FETCH_STATUS.RESOLVED, data });
    } catch (error) {
      if (!isMounted) {
        return;
      }
      dispatch({ type: FETCH_STATUS.REJECTED, error });
    }
  }, [url, config, isMounted]);

  useEffect(() => {
    run();
  }, [run]);

  return { status, data, error };
};
