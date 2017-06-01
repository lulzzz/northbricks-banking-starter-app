
// import { GroupsRootObject } from '../../interface/iBubble';
import { NorthbricksApi } from '../../providers/northbricks-api';
import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { NorthbricksStorage } from "../../providers/northbricks-storage";
import { Transaction } from "../../interface/iTransaction";
import { ToastService } from "../../providers/utils/toast.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  transactions: Transaction[] = [];
  constructor(public loadingCtrl: LoadingController,
    public storage: NorthbricksStorage,
    public northbricksApi: NorthbricksApi,
    public navCtrl: NavController,
    public toastCtrl: ToastService) {

  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.fetchTransactions();
      refresher.complete();
    }, 2000);
  }
  showTransaction(transactionId: number) {
    this.toastCtrl.create('Not implemented yet - ID- ' + transactionId, false, 1000);
  }
  ionViewCanEnter() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      showBackdrop: true,
      spinner: 'circles'
    });
    loader.present();

    this.northbricksApi.fetchTransactions(1).subscribe(data => {
      console.log(JSON.stringify(data));
      this.transactions = data;
      loader.dismiss();
    }, () => {
      loader.dismiss();
    });

  }



}