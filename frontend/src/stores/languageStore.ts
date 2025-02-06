import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type State = {
	lang: string
}

type Actions = {
	setLang: (lang: string) => void
}

export const useLangStore = create<State & Actions>()(
	immer((set) => ({
		lang: "",
		setLang: (lang: string) =>
			set((state) => {
				state.lang = lang
			}),
	})),
)
