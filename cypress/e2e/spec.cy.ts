/* eslint-disable no-underscore-dangle */
/// <reference types="cypress" />

export const DATA_TEST_ID = {
  createNewTrainingButton: "create-new-training-button",
  modalNoReview: "modal-no-review",
  modalErrorUserTrainingTitle: "modal-error-user-training-title",
  modalErrorUserTrainingSubTitle: "modal-error-user-training-subtitle",
  modalErrorUserTrainingButton: "modal-error-user-training-button",
  modalErrorUserTrainingButtonClose: "modal-error-user-training-button-close",
  menuButtonTraining: "menu-button-training",
  menuButtonCalendar: "menu-button-calendar",
  menuButtonProfile: "menu-button-profile",
  modalCreateTraining: "modal-create-training",
  modalCreateTrainingButtonClose: "modal-create-training-button-close",
  modalUpdateTrainingEditButton: "modal-update-training-edit-button",
  modalCreateExercise: "modal-create-exercise",
  modalCreateExerciseButton: "modal-create-exercise-button",
  modalCreateExerciseSelect: "modal-create-exercise-select",
  modalExerciseTrainingButtonClose: "modal-exercise-training-button-close",

  modalDrawerRight: "modal-drawer-right",
  modalDrawerRightButtonClose: "modal-drawer-right-button-close",
  modalDrawerRightInputExercise: "modal-drawer-right-input-exercise",
  modalDrawerRightCheckboxExercise: "modal-drawer-right-checkbox-exercise",
  modalDrawerRightInputApproach: "modal-drawer-right-input-approach",
  modalDrawerRightInputWeight: "modal-drawer-right-input-weight",
  modalDrawerRightInputQuantity: "modal-drawer-right-input-quantity",
  modalDrawerRightDatePicker: "modal-drawer-right-date-picker",
  modalDrawerRightCheckboxPeriod: "modal-drawer-right-checkbox-period",
  modalDrawerRightSelectPeriod: "modal-drawer-right-select-period",

  myTrainingsTable: "my-trainings-table",
  updateMyTrainingTableIcon: "update-my-training-table-icon",
  createTrainingSuccessAlert: "create-training-success-alert",
  searchInput: "search-input",
  jointTrainingCards: "joint-training-cards",
  notificationAboutJointTraining: "notification-about-joint-training",
  jointTrainingReviewCard: "joint-training-review-card",
  partnerModal: "partner-modal",
  sidebarAchievements: "sidebar-achievements",
};

const today = new Date().setDate(new Date().getDate());
const dayAfterTomorrow = new Date().setDate(new Date().getDate() + 1);
const dayBeforeToday = new Date().setDate(new Date().getDate() - 1);
const twoDaysLater = new Date().setDate(new Date().getDate() + 2);
const threeDaysLater = new Date().setDate(new Date().getDate() + 3);
const fourDaysLater = new Date().setDate(new Date().getDate() + 4);
// const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
const nextMonth = new Date().setDate(new Date().getDate() + 15);

const userTraining = [
  {
    _id: "1",
    name: "Ноги",
    date: today,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: 6,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Присяд",
        replays: 3,
        weight: 50,
        approaches: 10,
      },
      {
        _id: "2",
        name: "Толкание нагрузки",
        replays: 3,
        weight: 70,
        approaches: 10,
      },
    ],
  },
  {
    _id: "2",
    name: "Руки",
    date: today,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "2",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "3",
    name: "Силовая",
    date: twoDaysLater,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "4",
    name: "Спина",
    date: twoDaysLater,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "5",
    name: "Грудь",
    date: twoDaysLater,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "6",
    name: "Ноги",
    date: twoDaysLater,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "7",
    name: "Руки",
    date: twoDaysLater,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "8",
    name: "Силовая",
    date: threeDaysLater,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Присяд",
        replays: 3,
        weight: 50,
        approaches: 10,
      },
      {
        _id: "2",
        name: "Толкание нагрузки",
        replays: 3,
        weight: 70,
        approaches: 10,
      },
    ],
  },
  {
    _id: "9",
    name: "Спина",
    date: threeDaysLater,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "10",
    name: "Грудь",
    date: threeDaysLater,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "11",
    name: "Ноги",
    date: threeDaysLater,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "12",
    name: "Руки",
    date: fourDaysLater,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "13",
    name: "Силовая",
    date: dayBeforeToday,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "14",
    name: "Спина",
    date: dayAfterTomorrow,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "15",
    name: "Грудь",
    date: dayAfterTomorrow,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "16",
    name: "Ноги",
    date: nextMonth,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "17",
    name: "Руки",
    date: nextMonth,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "18",
    name: "Силовая",
    date: nextMonth,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "19",
    name: "Спина",
    date: nextMonth,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
  {
    _id: "20",
    name: "Грудь",
    date: nextMonth,
    isImplementation: false,
    userId: "65b809899adc9e39e3660ae0",
    parameters: {
      jointTraining: false,
      participants: [],
      period: null,
      repeat: false,
    },
    exercises: [
      {
        _id: "1",
        name: "Упражнение",
        replays: 1,
        weight: 0,
        approaches: 3,
      },
    ],
  },
];

const trainingList = [
  { name: "Ноги", key: "legs" },
  { name: "Руки", key: "hands" },
  { name: "Силовая", key: "strenght" },
  { name: "Спина", key: "back" },
  { name: "Грудь", key: "chest" },
];

describe("Sprint 7", () => {
  describe("Achievements", () => {
    const resolutionFull = [
      { width: 360, height: 740 },
      { width: 833, height: 900 },
      { width: 1440, height: 900 },
    ];
    const resolutionMobile = [{ width: 360, height: 740 }];
    const resolutionTablet = [{ width: 833, height: 900 }];
    const resolutionLaptop = [{ width: 1440, height: 900 }];

    function takeScreenshots(
      screenshotName: string,
      resolution = resolutionFull
    ) {
      cy.wait(1000);
      for (let i = 0; i < resolution.length; i++) {
        cy.viewport(resolution[i].width, resolution[i].height);
        cy.screenshot(
          `${screenshotName}_${resolution[i].width}x${resolution[i].height}`,
          {
            capture: "viewport",
          }
        );
      }
    }

    beforeEach(() => {
      cy.visit("/");
      cy.intercept("POST", "auth/login", { accessToken: "SUPERUSER" }).as(
        "login"
      );
      cy.visit("/auth");
      cy.get("[data-test-id=login-email]").type("valadzkoaliaksei@tut.by");
      cy.get("[data-test-id=login-password]").type("1234qqQQ");
      cy.get("[data-test-id=login-submit-button]").click();
      cy.url().should("include", "/main");
      cy.intercept("GET", "user/me", {
        statusCode: 200,
        body: {
          email: "valadzkoaliaksei@tut.by",
          readyForJointTraining: false,
          sendNotification: false,
        },
      }).as("getUser");
    });

    it("come to graphic arts", () => {
      cy.viewport(1440, 900);
      cy.url().should("include", "/main");
      cy.intercept("GET", "training", {
        statusCode: 200,
        body: userTraining,
      }).as("getUserTraining");
      cy.intercept("GET", "catalogs/training-list", {
        body: trainingList,
        statusCode: 200,
      }).as("getTrainingList");
      cy.get(`[data-test-id=${DATA_TEST_ID.sidebarAchievements}]`).click();
      cy.wait(2000);
      takeScreenshots("come-to-graphic-arts-1", resolutionLaptop);
      cy.url().should("include", "/achievements");
      cy.wait(2000);
      cy.contains("Ноги").click();
      takeScreenshots("come-to-graphic-arts-2", resolutionTablet);
      cy.contains("Руки").click();
      cy.wait(2000);
      takeScreenshots("come-to-graphic-arts-3", resolutionMobile);
      cy.contains("За месяц").click();
      cy.wait(2000);
      takeScreenshots("come-to-graphic-arts-4", resolutionLaptop);
      cy.contains("Силовая").click();
      cy.wait(2000);
      takeScreenshots("come-to-graphic-arts-5", resolutionTablet);
      cy.contains("Спина").click();
      cy.wait(2000);
      takeScreenshots("come-to-graphic-arts-6", resolutionMobile);
      cy.contains("Грудь").click();
      cy.wait(2000);
      takeScreenshots("come-to-trainings-7", resolutionLaptop);
    });
  });
});
