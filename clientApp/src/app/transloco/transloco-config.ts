import { TranslocoService } from "@ngneat/transloco";
import { LangService } from "../services/lang.service";


export function preloadLang(langService: LangService, transloco: TranslocoService) {
    return function() {
        const lang = langService.getInitialLang();
        return transloco.load(lang).toPromise();
    };
}