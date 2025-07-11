import {useSelector, type TypedUseSelectorHook} from 'react-redux'
import type {RootState} from "../../store/store.ts";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
