<template>
  <div class="toggler">

    <div v-if="!isYouWin" class="toggler_text">Ban internet</div>

    <div v-if="isYouWin" class="toggler_text" >
      Ok, ok, you win
    </div>

    <div class="toggler_list">
      <!--togglers - {{togglers}}-->
      <div class="toggler_item"
           v-for="item in togglers"

           v-bind:key="item.id">
        <div class="toggler_title">
          {{item.title}}
        </div>
        <div class="toggler_control">
          <v-switch
              hide-details
              v-bind:disabled="
                (item.val && item.id !== 0) ||
                (
                  item.val && item.id === 0 && !item.isInAction ||
                  item.val && item.id === 0 && item.isLockForAction
                )"
              v-bind:inset="true"
              v-bind:ripple="false"
              v-bind:class="{
                'toggler_switch-telegram-action': item.id === 0 && item.isInAction,
                'toggler_switch-torrents-action': item.id === 1 && item.isInAction,
              }"
              class="toggler_switch"

              v-model="item.val"
              v-on:change="changeToggler(item)"
          ></v-switch>
          <div v-if="item.id === 1"
               v-bind:class="{
                'toggler_torrents--active': item.id === 1 && item.isInAction
              }"
              class="toggler_torrents">
            <div v-for="item in checkboxes"
                 v-bind:key="item.id"
                 class="toggler_torrents-item">
              <v-checkbox
                  hide-details
                  v-bind:ripple="false"
                  class="toggler_checkbox"
                  v-model="item.val"
                  v-on:change="changeCheckbox(item)"
              ></v-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style lang="sass" rel="stylesheet/sass" src="./index.sass"></style>

<script src="./index.js"></script>


