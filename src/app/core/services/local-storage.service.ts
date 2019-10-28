import {Injectable} from '@angular/core';

const appSettings = require('application-settings');

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    /**
     * private methods
     */

    getItem(key: string): string {
        return appSettings.getString(key, null);
    }

    setItem(key: string, value: string): void {
        appSettings.setString(key, value);
    }

    private removeItem(key: string): void {
        appSettings.remove(key);
    }

    getItemObject(key: string): any {
        const jsonObjectStr = this.getItem(key);
        return jsonObjectStr ? JSON.parse(jsonObjectStr) : null;
    }

    setItemObject(key: string, object: any): void {
        this.setItem(key, JSON.stringify(object));
    }
}
