import {sendMessageToIpcMain} from 'root/windows/messages';
import {makeCard} from 'root/windows/overlay/functions/makecard';
import {currentMatch, overlayConfig, overlayElements, toggleButtonClass} from 'root/windows/overlay/overlay';

export function updateOppDeck(highlight: string[]): void {
  const oppDeck: Array<{cardDefId: string; rarity: string; artVariantDefId: string}> = [];
  const oppGraveyard: Array<{cardDefId: string; rarity: string; artVariantDefId: string}> = [];
  const oppDeckStrings: string[] = [];
  Object.keys(currentMatch.cardEntityIDs).forEach((cardEntityID) => {
    const TheEntity = currentMatch.cardEntityIDs[+cardEntityID];
    if (
      +TheEntity.ownerEntityId === +currentMatch.oppEntityId &&
      TheEntity.cardDefId !== '' &&
      oppDeck.findIndex((el) => el.cardDefId === TheEntity.cardDefId) === -1 &&
      currentMatch.zones[TheEntity.zoneId].type !== 'graveyardEntity'
    ) {
      oppDeck.push({
        cardDefId: TheEntity.cardDefId,
        rarity: TheEntity.rarityDefId,
        artVariantDefId: TheEntity.artVariantDefId,
      });
    }

    if (
      +TheEntity.ownerEntityId === +currentMatch.oppEntityId &&
      TheEntity.cardDefId !== '' &&
      oppDeck.findIndex((el) => el.cardDefId === TheEntity.cardDefId) === -1 &&
      currentMatch.zones[TheEntity.zoneId].type === 'graveyardEntity'
    ) {
      oppGraveyard.push({
        cardDefId: TheEntity.cardDefId,
        rarity: TheEntity.rarityDefId,
        artVariantDefId: TheEntity.artVariantDefId,
      });
    }

    /*if (+TheEntity.ownerEntityId === +currentMatch.oppEntityId && TheEntity.cardDefId !== '') {
      oppDeckStrings.push(TheEntity.cardDefId);
    }*/
  });

  /*if (oppDeckStrings.length > 2) {
    sendMessageToIpcMain('get-suggestions', oppDeckStrings);
  }*/

  let output = '';
  let outputGrave = '';

  //sortcards(forsort, true, SortLikeMTGA)

  oppDeck.forEach((card) => {
    output += makeCard(card.cardDefId, false, card.rarity, card.artVariantDefId);
  });

  oppGraveyard.forEach((card) => {
    outputGrave += makeCard(card.cardDefId, false, card.rarity, card.artVariantDefId);
  });

  overlayElements.OpponentOut.innerHTML =
    output +
    (outputGrave !== ''
      ? '<div style="flex-basis:100%; text-align:center; padding:5px">Graveyard</div>' + outputGrave
      : '');

  if (!overlayConfig.ovlSettings?.hideopp) {
    overlayElements.OpponentOutFrame.classList.remove('hidden');
    //toggleButtonClass(overlayElements.ToggleOpp, overlayElements.OpponentOutFrame.classList.contains('hidden'));
  }

  highlight.forEach((mtgaid) => {
    const crdEl: HTMLElement | null = document.getElementById(`card${mtgaid}opp`);
    if (crdEl) {
      crdEl.classList.add('highlightCard');
    }
  });

  setTimeout(() => {
    Array.from(document.getElementsByClassName('highlightCard')).forEach((el) => {
      el.classList.remove('highlightCard');
    });
  }, overlayConfig.highlightTimeout);

  /* const AllCards = document.getElementsByClassName('DcDrow');
  Array.from(AllCards).forEach((theCard) => {
    HoverEventListener(theCard);
  });*/
}
