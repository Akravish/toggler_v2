import clog from '../../helpers/helpers'

export default {
  name: 'Toggler',
  data () {
    return {
      togglers: [
        {
          title: 'Telegram',
          id: 0,
        },
        {
          title: 'Torrents',
          id: 1,
        },
        {
          title: 'Viber',
          id: 2,
        },
        {
          title: 'Twitter',
          id: 3,
        },
        {
          title: 'Facebook',
          id: 4,
        },
        {
          title: 'YouTube',
          id: 5,
        },
        {
          title: 'Wikipedia',
          id: 6,
        },
        {
          title: 'Game Servers',
          id: 7,
        }
      ],
      checkboxes: [
        {
          id: 0,
          val: true
        },
        {
          id: 1,
          val: false
        },
        {
          id: 2,
          val: false
        }
      ],
      isYouWin: false
    }
  },
  created: function () {
    //---prepare togglers
    this.togglers.forEach( (toggler, index) => {

      let item = Object.assign({},toggler, {
        val: false,
        counter: 0,
        isInAction: false,
        isLockForAction: false
      });
      this.$set(this.togglers, index, item);

    });
  },
  methods: {
    changeToggler(item) {
      if( !this._checkForWin() ) {
        //---telegram
        if (item.id === 0 && item.counter > 0) {
          if (item.isInAction) {
            //---clear 3 toggler
            item.isInAction = false;
            item.isLockForAction = true;
            for (let i = 0; i < 3; i++ ) {
              this._clearRandomToggler(item.id);
            }
          }

          if (!item.isLockForAction) {
            item.isInAction = true;
          }
        } else if (item.id === 1 && item.counter > 0) {
          if (!item.isLockForAction) {
            item.isInAction = true;
          }
        } else {
          //---check if random toggler will be cleared
         let numOfPositiveClear = this._getChance();
          let isWillBeClear = this._getRandomNum(numOfPositiveClear);
          if (isWillBeClear > 0) {
            //---clear random toggler
            this._clearRandomToggler(item.id)
          }
        }
      }
      item.counter++;
    },

    _getRandomNum(max) {
      //NOTE: The maximum and the minimum is inclusive
      let min = 0;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    _clearRandomToggler(itemId) {
      let toggledCollection = this.togglers.filter( toggler => {
        if (toggler.id !== itemId && !toggler.isLockForAction) {
          return toggler.val;
        }
        return false;
      });

      if (toggledCollection.length > 0) {
        let togglerForReset = toggledCollection[this._getRandomNum(toggledCollection.length - 1)];
        togglerForReset.val = false;
      }
    },

    _checkForWin() {
      this.isYouWin = this.togglers.every( toggler => {
        return toggler.val && !toggler.isInAction;
      });
      return this.isYouWin;
    },

    changeCheckbox(item) {
      let isCheckboxDone = this.checkboxes.every( checkbox => {
        return checkbox.val;
      });

      if (!isCheckboxDone) {
        let isWillBeClear = this._getRandomNum(2);
        if (isWillBeClear) {
          let checkboxesCollection = this.checkboxes.filter( checkbox => {
            if (checkbox.id !== item.id) {
              return checkbox.val;
            }
            return false;
          });

          if (checkboxesCollection.length > 0) {
            let checkboxForReset = checkboxesCollection[this._getRandomNum(checkboxesCollection.length - 1)];
            checkboxForReset.val = false;
          }
        }
      } else {
        this.togglers.forEach( toggler => {
          if (toggler.id !== 1) {
            if (!toggler.isLockForAction) {
              toggler.val = false;
            }
          } else {
            toggler.isInAction = false;
            toggler.isLockForAction = true;
          }
        });
      }
    },
    _getChance() {
      let length = this.togglers.length;
      let clickCounter = 0;

      this.togglers.forEach(toggler => {
        clickCounter = clickCounter + toggler.counter;
      });

      let chance = length/2 - clickCounter;
      if (chance < 1 ) {
        chance = 1
      }
      return chance;
    }
  }
}