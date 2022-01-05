<template>
  <q-page padding>
    <div>
      <q-btn icon="chevron_left" @click="previousStep" :disabled="model.__step === 0"/>
      <q-btn icon="chevron_right" @click="nextStep" :disabled="model.__step === schema.items.length"/>
    </div>
    <div>
      <q-linear-progress :value="progress" animation-speed="100" class="q-mt-md q-mb-md" />
    </div>
     <q-card>
      <q-card-section v-if="model.__step < schema.items.length">
        <BlitzForm :key='remountCount' :schema='generatedSchema' v-model='model' :columnCount='1' gridGap='32px'/>  
      </q-card-section>
      <q-card-section v-if="model.__step === schema.items.length">
        This is the end, congratulations!
      </q-card-section>
    </q-card>
    <div v-if="errorsRemain" class="bg-red-6 text-white q-mt-lg q-pa-md">
      <pre>{{ JSON.stringify(errors, null, '  ') }}</pre>
    </div>
    <div class="bg-black text-white q-mt-lg q-pa-md">
      <pre>{{ JSON.stringify(model, null, '  ') }}</pre>
    </div>
  </q-page>
</template>

<script>
import { BlitzForm, validateFormPerSchema } from '@blitzar/form'
import { ref } from 'vue'
import { makeBlitzarQuasarSchemaForm, getBlitzarIdsAt } from 'ui'

const schema = {
  "label": "form_title",
  "items": [
    {
      "name": "TRANSFER",
      "type": "group",
      "label": "transfer",
      "items": [
        {
          "name": "FROM",
          "type": "toggle",
          "label": "transfer_from",
          "required": "true"
        },
        {
          "name": "HOSP",
          "type": "select",
          "label": "transfer_hosp",
          "options": [
            {
              "value": "1",
              "label": "MUHC"
            },
            {
              "value": "2",
              "label": "Ste Justine"
            },
            {
              "value": "3",
              "label": "Hôtel Dieu"
            }
          ],
          "condition": "$('TRANSFER.FROM')",
          "required": "true"
        },
        {
          "name": "COMMENT",
          "type": "text",
          "label": "Some comment when transferred",
          "condition": "$('TRANSFER.FROM')",
          "required": "true",
          "validation": "val && val.length > 3",
          "validationMessage": "Text is required and must have a minimum length of 4 chars."
        }
      ]
    },
    {
      "name": "INJURIES",
      "type": "group",
      "label": "injuries",
      "items": [
        {
          "name": "TYPE",
          "type": "select",
          "label": "injury_type",
          "options": [
            {
              "value": "1",
              "label": "facial_fracture"
            },
            {
              "value": "2",
              "label": "fracture_spine"
            },
            {
              "value": "3",
              "label": "fracture_upper_extremity"
            },
            {
              "value": "4",
              "label": "pelvic_fracture"
            },
            {
              "value": "5",
              "label": "fracture_lower_extremity"
            },
            {
              "value": "6",
              "label": "skull_fracture"
            },
            {
              "value": "7",
              "label": "head_injury"
            },
            {
              "value": "8",
              "label": "neck_injury"
            },
            {
              "value": "9",
              "label": "thoracic_injury"
            },
            {
              "value": "10",
              "label": "abdominal_injury"
            },
            {
              "value": "11",
              "label": "cut_open_wound"
            },
            {
              "value": "12",
              "label": "sprain_strain"
            },
            {
              "value": "13",
              "label": "dislocation_upper_extremity"
            },
            {
              "value": "14",
              "label": "dislocation_lower_extremity"
            },
            {
              "value": "15",
              "label": "burn"
            },
            {
              "value": "16",
              "label": "soft_tissue_extremity_without_fracture"
            }
          ],
          "multiple": true
        },
        {
          "name": "FACIAL_OPEN",
          "type": "toggle",
          "label": "facial_fracture_open",
          "condition": "$('INJURIES.TYPE') && $('INJURIES.TYPE').includes('1')",
          "default": "false"
        },
        {
          "name": "SKULL_OPEN",
          "type": "toggle",
          "label": "skull_fracture_open",
          "condition": "$('INJURIES.TYPE') && $('INJURIES.TYPE').includes('6')"
        }
      ]
    },
    {
      "name": "OUTCOME",
      "type": "group",
      "label": "outcome",
      "items": [
        {
          "name": "CASUALTY",
          "type": "radiogroup",
          "label": "outcome_casualty_department",
          "options": [
            {
              "value": "1",
              "label": "treated_sent_home"
            },
            {
              "value": "2",
              "label": "admitted_hospital_ward"
            },
            {
              "value": "3",
              "label": "taken_operating_theatre"
            },
            {
              "value": "4",
              "label": "admitted_intensive_care"
            },
            {
              "value": "5",
              "label": "died"
            },
            {
              "value": "6",
              "label": "referred_another_hospital"
            }
          ]
        },
        {
          "name": "REF_HOSP",
          "type": "text",
          "label": "referred_which_hospital",
          "condition": "$('OUTCOME.CASUALTY') === '6'"
        },
        {
          "name": "FILLED_BY",
          "type": "text",
          "label": "outcome_filled_by"
        }
      ]
    }
  ],
  "description": "form_description",
  "i18n": {
    "en": {
      "form_title": "Adult trauma",
      "form_description": "Adult trauma registry",
      "transfer": "Transfer",
      "transfer_from": "Transfer from other hospital",
      "transfer_hosp": "Transfer from hospital",
      "MUHC": "MUHC",
      "Ste Justine": "Ste Justine",
      "Hôtel Dieu": "Hôtel Dieu",
      "arrival": "Arrival",
      "id": "Patient's identification number",
      "trauma_dt": "Date and time of trauma",
      "arrival_dt": "Date & time of arrival",
      "attend_dt": "Date and time attended by Dr.",
      "patient": "Patient",
      "patient_description": "patient_description",
      "origin_region": "Origin region",
      "origin_district": "Origin district",
      "injury": "Injury",
      "injury_description": "injury_description",
      "place_region": "Région of injury",
      "place_district": "District of injury",
      "demo": "Demographic",
      "demo_description": "Patient demographic data",
      "age": "Age",
      "sex": "Sex",
      "male": "Male",
      "female": "Female",
      "edu_level": "Education level",
      "child": "Child",
      "primary": "Primary",
      "secondary": "Secondary",
      "college_university": "College/University",
      "occupation": "Occupation",
      "child_student": "Child/Student",
      "employed_manual_labourer": "Employed: manual labourer",
      "employed_office_work": "Employed: office work",
      "employed_police_army_security": "Employed: police/army/security",
      "employed_mining": "Employed: mining",
      "employed_other": "Employed: other",
      "unemployed": "Unemployed",
      "retired": "Retired",
      "mechanism": "Mechanism",
      "injury_cause": "Injury cause",
      "motor_vehicle_collision": "Motor vehicle collision",
      "fall": "Fall",
      "blunt_ssault": "Blunt assault",
      "stab_cut": "Stab/Cut",
      "gunshot": "Gunshot",
      "blast_landmine": "Blast/Landmine",
      "burn": "Burn",
      "drowning": "Drowning",
      "human_bite": "Human bite",
      "animal_bite": "Animal bite",
      "crush": "Crush",
      "settings": "Settings",
      "transportation_accident": "Transportation accident",
      "work": "Work",
      "home": "Home",
      "school": "School",
      "leisure_sport": "Leisure/Sport",
      "intent": "Intent",
      "unintentional": "Unintentional",
      "self_inflicted": "Self inflicted",
      "assault": "Assault",
      "alcohol": "Alcohol",
      "no": "No",
      "suspected_confirmed": "Suspected/Confirmed",
      "unknown": "Unknown",
      "road_traffic_incident": "Road traffic incident",
      "vehicle_type": "Type of vehicle",
      "car": "Car",
      "motorbike": "Motorbike",
      "tricycle_bicycle": "Tricycle/Bicycle",
      "bus": "Bus",
      "truck": "Truck",
      "sector": "Sector",
      "private_vehicle": "Private vehicle",
      "public_transit": "Public transit",
      "commercial_vehicle": "Commercial vehicle",
      "road_role": "Role on the road",
      "driver": "Driver",
      "passenger": "Passenger",
      "pedestrian": "Pedestrian",
      "helmet_use": "Helmet use",
      "seatbelt_se": "Seatbelt use",
      "injuries": "Injuries",
      "arterial_pressure": "Arterial pressure",
      "89_mmhg": ">89 mmHg",
      "50_89_mmhg": "50-89 mmHg",
      "50_mmhg": "<50 mmHg",
      "not_detectable": "Not detectable",
      "respiratory_rate": "Respiratory rate",
      "10_29_minute": "10-29/minute",
      "30_minute": "30+/minute",
      "9_minute": "≤9/minute",
      "neurological_status": "Neurological status",
      "alert": "Alert",
      "responds_verbal_stimuli": "Responds to verbal stimuli",
      "responds_painful_stimuli": "Responds to painful stimuli",
      "unresponsive": "Unresponsive",
      "serious_injuries": "Serious injuries",
      "none": "None",
      "one": "One",
      "more_than_one": "More than one",
      "injury_type": "Type of injury",
      "facial_fracture": "Facial fracture",
      "fracture_spine": "Fracture spine",
      "fracture_upper_extremity": "Fracture upper extremity",
      "pelvic_fracture": "Pelvic fracture",
      "fracture_lower_extremity": "Fracture lower extremity",
      "skull_fracture": "Skull fracture",
      "head_injury": "Head injury",
      "neck_injury": "Neck injury",
      "thoracic_injury": "Thoracic injury",
      "abdominal_injury": "Abdominal injury",
      "cut_open_wound": "Cut/Open wound",
      "sprain_strain": "Sprain/Strain",
      "dislocation_upper_extremity": "Dislocation upper extremity",
      "dislocation_lower_extremity": "Dislocation lower extremity",
      "soft_tissue_extremity_without_fracture": "Soft tissue extremity without fracture",
      "facial_fracture_open": "Facial fracture is open",
      "spine_fracture_with_paralysis": "Spine fracture with paralysis",
      "spine_fracture_open": "Spine fracture is open",
      "upper_extremity_fracture_open": "Upper extremity fracture is open",
      "pelvic_fracture_open": "Pelvic fracture is open",
      "lower_extremity_fracture_open": "Lower extremity fracture is open",
      "skull_fracture_open": "Skull fracture is open",
      "outcome": "Outcome",
      "outcome_casualty_department": "Outcome from casualty department",
      "treated_sent_home": "Treated and sent home",
      "admitted_hospital_ward": "Admitted to hospital ward",
      "taken_operating_theatre": "Taken to operating theatre",
      "admitted_intensive_care": "Admitted to intensive care",
      "died": "Died",
      "referred_another_hospital": "Referred to another hospital",
      "referred_which_hospital": "Referred to which hospital?",
      "outcome_filled_by": "Outcome filled by"
    },
    "fr": {
      "form_title": "Traumatismes des adultes",
      "form_description": "Registre des traumatismes des adultes",
      "transfer": "Transfert",
      "transfer_from": "Transfert depuis un autre hôpital",
      "transfer_hosp": "Transfert depuis l'hôpital",
      "MUHC": "MUHC",
      "Ste Justine": "Ste Justine",
      "Hôtel Dieu": "Hôtel Dieu",
      "arrival": "Arrivée",
      "id": "Identifiant du patient",
      "trauma_dt": "Date et heure du traumatisme",
      "arrival_dt": "Date et heure d'arrivée",
      "attend_dt": "Date et heure de prise en charge",
      "patient": "Patient",
      "patient_description": "patient_description",
      "origin_region": "Région d'origine",
      "origin_district": "District d'origine",
      "injury": "Blessure",
      "injury_description": "injury_description",
      "place_region": "Région dans laquelle a eu lieu la blessure",
      "place_district": "District où a eu lieu la blessure",
      "demo": "Démographie",
      "demo_description": "Données démographiques du patient",
      "age": "Age",
      "sex": "Sexe",
      "male": "Homme",
      "female": "Femme",
      "edu_level": "Niveau d'éducation",
      "child": "Enfant",
      "primary": "Primaire",
      "secondary": "Secondaire",
      "college_university": "Université",
      "occupation": "Occupation",
      "child_student": "Enfant/Étudiant",
      "employed_manual_labourer": "Employé : travailleur manuel",
      "employed_office_work": "Employé : travail de bureau",
      "employed_police_army_security": "Employé : police / armée / sécurité",
      "employed_mining": "Employé : mine",
      "employed_other": "Autre emploi",
      "unemployed": "Sans emploi",
      "retired": "Retraité",
      "mechanism": "Mécanisme",
      "injury_cause": "Cause de la blessure",
      "motor_vehicle_collision": "Collision avec un véhicule à moteur",
      "fall": "Chute",
      "blunt_ssault": "Aggression directe",
      "stab_cut": "Poignardé / Coupé",
      "gunshot": "Coup de feu",
      "blast_landmine": "Explosion/Mine antipersonel",
      "burn": "Brûlure",
      "drowning": "Noyade",
      "human_bite": "Morsure humaine",
      "animal_bite": "Morsure d'animal",
      "crush": "Écrasement",
      "settings": "Situation",
      "transportation_accident": "Accident des transports",
      "work": "Travail",
      "home": "Maison",
      "school": "École",
      "leisure_sport": "Loisir / Sport",
      "intent": "Intentionnel",
      "unintentional": "Involontaire",
      "self_inflicted": "Auto-infligé",
      "assault": "Agression",
      "alcohol": "Alcool",
      "no": "Non",
      "suspected_confirmed": "Suspecté / Confirmé",
      "unknown": "Inconnu",
      "road_traffic_incident": "Incident de circulation routière",
      "vehicle_type": "Type de véhicule",
      "car": "Voiture",
      "motorbike": "Moto",
      "tricycle_bicycle": "Tricycle / Bicyclette",
      "bus": "Bus",
      "truck": "Camion",
      "sector": "Secteur",
      "private_vehicle": "Véhicule privé",
      "public_transit": "Transport en commun",
      "commercial_vehicle": "Véhicule commercial",
      "road_role": "Rôle sur la route",
      "driver": "Conducteur",
      "passenger": "Passager",
      "pedestrian": "Piéton",
      "helmet_use": "Usage du casque",
      "seatbelt_se": "Utilisation de la ceinture de sécurité",
      "injuries": "Blessures",
      "arterial_pressure": "Pression artérielle",
      "89_mmhg": ">89 mmHg",
      "50_89_mmhg": "50-89 mmHg",
      "50_mmhg": "<50 mmHg",
      "not_detectable": "Non détectable",
      "respiratory_rate": "Fréquence respiratoire",
      "10_29_minute": "10-29/minute",
      "30_minute": "30+/minute",
      "9_minute": "≤9/minute",
      "neurological_status": "État neurologique",
      "alert": "Alerte",
      "responds_verbal_stimuli": "Répond aux stimuli verbaux",
      "responds_painful_stimuli": "Répond aux stimuli douloureux",
      "unresponsive": "Ne répond pas",
      "serious_injuries": "Blessures sérieuses",
      "none": "Aucun",
      "one": "Un",
      "more_than_one": "Plus d'un",
      "injury_type": "Type de blessure",
      "facial_fracture": "Fracture du visage",
      "fracture_spine": "Fracture de la colonne",
      "fracture_upper_extremity": "Fracture d'un membre supérieur",
      "pelvic_fracture": "Fracture pelvienne",
      "fracture_lower_extremity": "Fracture d'un membre inférieur",
      "skull_fracture": "Fracture du crâne",
      "head_injury": "Blessure à la tête",
      "neck_injury": "Blessure au cou",
      "thoracic_injury": "Blessure du thorax",
      "abdominal_injury": "Blessure abdominale",
      "cut_open_wound": "Coupure/Blessure ouverte",
      "sprain_strain": "Entorse / Foulure",
      "dislocation_upper_extremity": "Dislocation extrémité supérieure",
      "dislocation_lower_extremity": "Dislocation extrémité inférieure",
      "soft_tissue_extremity_without_fracture": "Tissus mous des extrémités sans fracture",
      "facial_fracture_open": "Fracture du visage ouverte",
      "spine_fracture_with_paralysis": "Fracture de la colonne avec paralysie",
      "spine_fracture_open": "La fracture de la colonne est ouverte",
      "upper_extremity_fracture_open": "La fracture du membre supérieur est ouverte",
      "pelvic_fracture_open": "La fracture pelvienne est ouverte",
      "lower_extremity_fracture_open": "La fracture de membre inférieur est ouverte",
      "skull_fracture_open": "La fracture du crâne est ouverte",
      "outcome": "Diagnostique",
      "outcome_casualty_department": "Diagnostique du service des urgences",
      "treated_sent_home": "Traité et envoyé à la maison",
      "admitted_hospital_ward": "Admis en salle d'hôpital",
      "taken_operating_theatre": "Emmené au bloc opératoire",
      "admitted_intensive_care": "Admis en soins intensifs",
      "died": "Décédé",
      "referred_another_hospital": "Référé à un autre hôpital",
      "referred_which_hospital": "Référé à quel hôpital?",
      "outcome_filled_by": "Diagnostique rempli par"
    }
  }
}

export default {
  components: { BlitzForm },
  setup () {
    return {
      remountCount: 0,
      progress: 0,
      errorsRemain: ref(false),
      errors: ref({}),
      model: ref({__step: 0}),
      schema: schema,
      generatedSchema: makeBlitzarQuasarSchemaForm(schema, { locale: 'en', stepId: '__step', debug: true })
    }
  },
  methods: {
    previousStep () {
      this.model.__step--
      this.progress = this.model.__step / this.schema.items.length
      this.remountCount++
      this.errorsRemain = false
      this.errors = undefined
    },
    nextStep () {
      const result = validateFormPerSchema(this.model, this.generatedSchema)
      this.errors = Object.keys(result)
        .filter(key => result[key] !== null)
        .reduce((obj, key) => {
          obj[key] = result[key];
          return obj;
        }, {})
      this.errorsRemain = this.errors && Object.keys(this.errors).length > 0
      // if no error in the step, continue
      if (!this.errorsRemain) {
        this.model.__step++
        this.progress = this.model.__step / this.schema.items.length
        this.remountCount++
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
