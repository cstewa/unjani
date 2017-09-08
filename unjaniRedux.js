import { createStore } from 'redux'

const POTENTIAL_BODY_LOCATIONS = 
  [
    {
      "ID": 16,
      "Name": "Abdomen, pelvis & buttocks"
    },
    {
      "ID": 7,
      "Name": "Arms & shoulder"
    },
    {
      "ID": 15,
      "Name": "Chest & back"
    },
    {
      "ID": 6,
      "Name": "Head, throat & neck"
    },
    {
      "ID": 10,
      "Name": "Legs"
    },
    {
      "ID": 17,
      "Name": "Skin, joints & general"
    }
  ]

export const noneOption = {
  "ID": 'noneOptionID',
  "Name": "None"
}

const DEFAULT_MEDICAL_INFO = {
  BODY_LOCATION: {
    potential: POTENTIAL_BODY_LOCATIONS,
    selected: []
  }
}

export const prompts = {
  BODY_LOCATION: 'Which part of your body hurts?',
  BODY_SUBLOCATION: 'Specifially, which of these body parts hurts?',
  SUBLOCATION_SYMPTOMS: 'Which of these symptoms are you having?',
  ADDITIONAL_SYMPTOMS: 'Are you having any additional symptoms?',
  DIAGNOSES: 'Here are your potential diagnoses'
}


export const actionTypes = {
  PERSONAL_DATA_CHANGE: 'PERSONAL_DATA_CHANGE',
  OPTIONS_SUBMITTED: 'OPTIONS_SUBMITTED',
  REQUEST_COMPLETED: 'REQUEST_COMPLETED'
}

export const stages = {
  PERSONAL_DATA: 'PERSONAL_DATA',
  BODY_LOCATION: 'BODY_LOCATION',
  BODY_SUBLOCATION: 'BODY_SUBLOCATION',
  SUBLOCATION_SYMPTOMS: 'SUBLOCATION_SYMPTOMS',
  ADDITIONAL_SYMPTOMS: 'ADDITIONAL_SYMPTOMS',
  DIAGNOSES: 'DIAGNOSES'
}

const stagesKeys = ['PERSONAL_DATA', 'BODY_LOCATION', 'BODY_SUBLOCATION', 'SUBLOCATION_SYMPTOMS', 'ADDITIONAL_SYMPTOMS', 'DIAGNOSES']

const initialState = {
  gender: undefined,
  birthYear: undefined,
  isFetching: false,
  stage: stages.PERSONAL_DATA,
  medicalInfo: DEFAULT_MEDICAL_INFO
}

export const reducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case actionTypes.PERSONAL_DATA_CHANGE: {
      return {
        ...state,
        gender: payload.gender, 
        birthYear: payload.birthYear,
        stage: stages.BODY_LOCATION
      }
    }
    case actionTypes.OPTIONS_SUBMITTED: {
      const medicalInfo = state.medicalInfo;
      medicalInfo[state.stage].selected = payload.selected;
      return {
        ...state,
        isFetching: true,
        medicalInfo: medicalInfo
      }
    }
    case actionTypes.REQUEST_COMPLETED: {
      const medicalInfo = state.medicalInfo;
      const nextStageIndex = (stagesKeys.indexOf(state.stage) + 1)
      const nextStage = stagesKeys[nextStageIndex]
      const potential = payload.potential
      if (nextStage == stages.ADDITIONAL_SYMPTOMS) { potential.push(noneOption) }
      medicalInfo[nextStage] = { potential: potential, selected: [] }
      return {
        ...state,
        isFetching: false,
        stage: nextStage, 
        medicalInfo: medicalInfo
      }
    }
  }

  return state
}

export const store = createStore(reducer)
