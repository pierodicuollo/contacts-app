<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
          <v-layout

            fill-height
          >
            <v-card-title>
              <v-btn icon>
                <v-icon>chevron_left</v-icon>
              </v-btn>

            </v-card-title>
            <v-card-title class="black--text">
              <div class="display-1">Ali Conners</div>
            </v-card-title>
              <v-spacer></v-spacer>

              <v-btn icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>delete</v-icon>
              </v-btn>
          </v-layout>
        </v-card-media>

        <v-list two-line>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>(650) 555-1234</v-list-tile-title>
              <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
              <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>


          <v-divider inset></v-divider>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">notes</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>1400 Main Street</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>