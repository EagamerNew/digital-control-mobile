import {Component} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'MainPageActionBar',
    templateUrl: './main-page-action-bar.component.html',
    styleUrls: ['./main-page-action-bar.component.scss']

})
export class MainPageActionBarComponent {

    searchText = 'Мазмұн бойынша іздеу...';

    constructor(
        private router: RouterExtensions
    ) {
    }

    openMenu() {
        this.router.navigate(['/main/profile'], {transition: {name: 'slide'}});
    }
}
