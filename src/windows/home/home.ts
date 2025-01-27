// tslint:disable: no-any no-unsafe-any no-import-side-effect
import 'pretty-checkbox/dist/pretty-checkbox.min.css';

import {NetworkStatusMessage} from 'root/lib/messages';
import 'root/windows/css.css';
import 'root/windows/fa-brands-400.woff2';
import 'root/windows/fa-regular-400.woff2';
import 'root/windows/fa-solid-900.woff2';
import 'root/windows/fontawesome.css';
import 'root/windows/rP2Hp2ywxg089UriCZ2IHSeH.woff2';
import 'root/windows/rP2Hp2ywxg089UriCZOIHQ.woff2';
import {controlClick} from 'root/windows/home/functions/controlclick';
import {installHomeMessages} from 'root/windows/home/functions/messages';
import {settingsChecker} from 'root/windows/home/functions/settingsChecker';
import {tabclick} from 'root/windows/home/functions/tabclick';
import 'root/windows/home/home.css';
import 'root/windows/home/icons.css';
import {onMessageFromIpcMain, sendMessageToIpcMain} from 'root/windows/messages';
import {setHkClick} from 'root/windows/home/functions/setHkClick';

export const HomePageElements = {
  header: document.getElementById('header') as HTMLElement,
  titleimg: document.getElementById('titleimg') as HTMLElement,
  mtgapro: document.getElementById('mtgapro') as HTMLElement,
  TokenResponse: document.getElementById('TokenResponse') as HTMLElement,
  TokenInput: document.getElementById('TokenInput') as HTMLElement,
  UserCredentials: document.getElementById('UserCredentials') as HTMLElement,
  StatusMessage: document.getElementById('StatusMessage') as HTMLElement,
  AppVersion: document.getElementById('AppVersion') as HTMLElement,
  minimizeButton: document.getElementById('minimize') as HTMLElement,
  AccountsTab: document.getElementById('accounts') as HTMLElement,
  UserControls: document.getElementById('UserControls') as HTMLElement,
  BrightButton: document.getElementById('brightButton') as HTMLElement,
  PromptWnd: document.getElementById('PromptWnd') as HTMLElement,
  PromptText: document.getElementById('PromptText') as HTMLElement,
  NetworkStatus: document.getElementById('network-status') as HTMLElement,
  directSyncLink: document.getElementById('directSyncLink') as HTMLElement,
  LordirectSyncLink: document.getElementById('LordirectSyncLink') as HTMLElement,
  buttons: document.getElementsByClassName('button'),
  hkSetters: document.getElementsByClassName('setHk'),
  tabs: document.getElementsByClassName('tab'),
  controls: document.getElementsByClassName('controlButton'),
  settings: document.getElementsByClassName('settings'),
  MtgaTab: document.getElementsByClassName('MtgaTab'),
  StartupTitle: document.getElementById('startup-title') as HTMLElement,
  OverlaySwitch: document.getElementById('OverlaySwitch') as HTMLElement,
  hotkeyMap: document.getElementById('hotkeyMap') as HTMLElement,
};

export const currentCreds: {
  playerid: string;
  plguid: string;
  currentLogState: boolean;
  hkBeingSet: string;
  numberOfSyncAttempts: number;
} = {
  playerid: '',
  plguid: '',
  currentLogState: false,
  hkBeingSet: '',
  numberOfSyncAttempts: 0,
};

installHomeMessages();

HomePageElements.minimizeButton.addEventListener('click', () => {
  sendMessageToIpcMain('minimize-me', undefined);
});

HomePageElements.AppVersion.addEventListener('click', () => {
  sendMessageToIpcMain('check-updates', undefined);
});

HomePageElements.PromptWnd.addEventListener('click', () => {
  HomePageElements.PromptWnd.style.display = 'none';
});

Array.from(HomePageElements.buttons).forEach((el) => {
  el.addEventListener('click', tabclick);
});

Array.from(HomePageElements.controls).forEach((el) => {
  el.addEventListener('click', controlClick);
});

Array.from(HomePageElements.settings).forEach((el) => {
  el.addEventListener('change', settingsChecker);
});

Array.from(HomePageElements.hkSetters).forEach((el) => {
  el.addEventListener('click', setHkClick);
});

onMessageFromIpcMain('network-status', (status) => {
  HomePageElements.NetworkStatus.title = `${status.message}${
    status.eventsleft !== undefined ? ` (${status.eventsleft} events to upload)` : ''
  }`;
  HomePageElements.NetworkStatus.className = getNetworkStatusClassName(status);
});

function getNetworkStatusClassName(status: {active: boolean; message: NetworkStatusMessage}): string {
  if (status.active) {
    if (status.message === NetworkStatusMessage.Connected) {
      return 'network-status-active';
    } else {
      return 'network-status-sending';
    }
  } else {
    return 'network-status-inactive';
  }
}
