import type {AppStore} from "../../store/store.ts";

export let storeRef: AppStore | null = null;

export const injectStore: (appstore: AppStore) => void = (appStore: AppStore): void => {
    storeRef = appStore;
}