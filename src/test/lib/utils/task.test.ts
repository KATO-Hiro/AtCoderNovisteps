import { expect, test } from 'vitest';

import {
  taskUrl,
  countAcceptedTasks,
  countAllTasks,
  areAllTasksAccepted,
  compareByContestIdAndTaskId,
} from '$lib/utils/task';
import type { WorkBookTaskBase } from '$lib/types/workbook';
import { type TaskResult, type TaskResults } from '$lib/types/task';

import {
  taskResultsForUserId2,
  taskResultsForUserId3,
  taskResultsForUserId4,
  taskResultsForUserId5,
  threeWorkBookTasks,
  tasksForVerificationOfOrder,
} from './test_cases/task_results';

type TestCaseForTaskUrl = {
  contestId: string;
  taskId: string;
  expected: string;
};

type TestCasesForTaskUrl = TestCaseForTaskUrl[];

type TestCaseForTaskResults = {
  taskResults: TaskResults;
  expected?: number;
};

type TestCasesForTaskResults = TestCaseForTaskResults[];

type TestCaseForWorkBookTasks = {
  taskResults?: TaskResults;
  workBookTasks: WorkBookTaskBase[];
  expected?: number;
};

type TestCasesForWorkBookTasks = TestCaseForWorkBookTasks[];

type TestCaseForSortingTaskResults = {
  first: TaskResult;
  second: TaskResult;
  expected: number;
};

type TestCasesForSortingTaskResults = TestCaseForSortingTaskResults[];

describe('Task', () => {
  describe('task url', () => {
    describe('when contest ids and task ids in AtCoder are given', () => {
      const testCases: TestCasesForTaskUrl = [
        {
          contestId: 'abs',
          taskId: 'practice_1',
          expected: 'https://atcoder.jp/contests/abs/tasks/practice_1',
        },
        {
          contestId: 'abc365',
          taskId: 'abc365_a',
          expected: 'https://atcoder.jp/contests/abc365/tasks/abc365_a',
        },
        {
          contestId: 'abc365',
          taskId: 'abc365_b',
          expected: 'https://atcoder.jp/contests/abc365/tasks/abc365_b',
        },
        {
          contestId: 'abc365',
          taskId: 'abc365_c',
          expected: 'https://atcoder.jp/contests/abc365/tasks/abc365_c',
        },
        {
          contestId: 'abc365',
          taskId: 'abc365_d',
          expected: 'https://atcoder.jp/contests/abc365/tasks/abc365_d',
        },
        {
          contestId: 'abc365',
          taskId: 'abc365_e',
          expected: 'https://atcoder.jp/contests/abc365/tasks/abc365_e',
        },
        {
          contestId: 'abc365',
          taskId: 'abc365_f',
          expected: 'https://atcoder.jp/contests/abc365/tasks/abc365_f',
        },
        {
          contestId: 'abc365',
          taskId: 'abc365_g',
          expected: 'https://atcoder.jp/contests/abc365/tasks/abc365_g',
        },
        {
          contestId: 'APG4b',
          taskId: 'APG4b_a',
          expected: 'https://atcoder.jp/contests/APG4b/tasks/APG4b_a',
        },
        {
          contestId: 'typical90',
          taskId: 'typical90_a',
          expected: 'https://atcoder.jp/contests/typical90/tasks/typical90_a',
        },
        {
          contestId: 'dp',
          taskId: 'dp_b',
          expected: 'https://atcoder.jp/contests/dp/tasks/dp_b',
        },
        {
          contestId: 'tdpc',
          taskId: 'tdpc_contest',
          expected: 'https://atcoder.jp/contests/tdpc/tasks/tdpc_contest',
        },
        {
          contestId: 'past16-open',
          taskId: 'past202309_a',
          expected: 'https://atcoder.jp/contests/past16-open/tasks/past202309_a',
        },
        {
          contestId: 'practice2',
          taskId: 'practice2_a',
          expected: 'https://atcoder.jp/contests/practice2/tasks/practice2_a',
        },
        {
          contestId: 'joi2023yo1c',
          taskId: 'joi2023_yo1c_a',
          expected: 'https://atcoder.jp/contests/joi2023yo1c/tasks/joi2023_yo1c_a',
        },
        {
          contestId: 'tessoku-book',
          taskId: 'tessoku_book_a',
          expected: 'https://atcoder.jp/contests/tessoku-book/tasks/tessoku_book_a',
        },
        {
          contestId: 'math-and-algorithm',
          taskId: 'math_and_algorithm_a',
          expected: 'https://atcoder.jp/contests/math-and-algorithm/tasks/math_and_algorithm_a',
        },
      ];

      runTests('taskUrl', testCases, ({ contestId, taskId, expected }: TestCaseForTaskUrl) => {
        expect(taskUrl(contestId, taskId)).toBe(expected);
      });
    });

    function runTests(
      testName: string,
      testCases: TestCasesForTaskUrl,
      testFunction: (testCase: TestCaseForTaskUrl) => void,
    ) {
      test.each(testCases)(`${testName}(contestId: $contestId, taskId: $taskId)`, testFunction);
    }
  });

  describe('count accepted tasks', () => {
    test('when empty task results are given', () => {
      expect(countAcceptedTasks([])).toBe(0);
    });

    describe('when 0 out of 3 are is_ac = true are given', () => {
      const testCases: TestCasesForTaskResults = [
        {
          taskResults: taskResultsForUserId2,
          expected: 0,
        },
      ];

      runTests(
        'countAcceptedTasks',
        testCases,
        ({ taskResults, expected }: TestCaseForTaskResults) => {
          expect(countAcceptedTasks(taskResults)).toBe(expected);
        },
      );
    });

    describe('when 2 out of 3 are is_ac = true given', () => {
      const testCases: TestCasesForTaskResults = [
        {
          taskResults: taskResultsForUserId3,
          expected: 2,
        },
      ];

      runTests(
        'countAcceptedTasks',
        testCases,
        ({ taskResults, expected }: TestCaseForTaskResults) => {
          expect(countAcceptedTasks(taskResults)).toBe(expected);
        },
      );
    });

    describe('when 3 out of 3 are is_ac = true given', () => {
      const testCases: TestCasesForTaskResults = [
        {
          taskResults: taskResultsForUserId4,
          expected: 3,
        },
      ];

      runTests(
        'countAcceptedTasks',
        testCases,
        ({ taskResults, expected }: TestCaseForTaskResults) => {
          expect(countAcceptedTasks(taskResults)).toBe(expected);
        },
      );
    });

    function runTests(
      testName: string,
      testCases: TestCasesForTaskResults,
      testFunction: (testCase: TestCaseForTaskResults) => void,
    ) {
      test.each(testCases)(`${testName}(taskResults: $taskResults)`, testFunction);
    }
  });

  describe('count all tasks using taskResults', () => {
    test('when empty task results are given', () => {
      expect(countAllTasks([])).toBe(0);
    });

    describe('when 3 taskResults are given', () => {
      const testCases: TestCasesForTaskResults = [
        {
          taskResults: taskResultsForUserId3,
          expected: 3,
        },
      ];

      runTests('countAllTasks', testCases, ({ taskResults, expected }: TestCaseForTaskResults) => {
        expect(countAllTasks(taskResults)).toBe(expected);
      });
    });

    function runTests(
      testName: string,
      testCases: TestCasesForTaskResults,
      testFunction: (testCase: TestCaseForTaskResults) => void,
    ) {
      test.each(testCases)(`${testName}(taskResults: $taskResults)`, testFunction);
    }
  });

  describe('count all tasks using WorkBookTaskBase[]', () => {
    test('when empty workbook tasks are given', () => {
      expect(countAllTasks([])).toBe(0);
    });

    describe('when 3 workbook tasks are given', () => {
      const testCases: TestCasesForWorkBookTasks = [
        {
          workBookTasks: threeWorkBookTasks,
          expected: 3,
        },
      ];

      runTests(
        'countAllTasks',
        testCases,
        ({ workBookTasks, expected }: TestCaseForWorkBookTasks) => {
          expect(countAllTasks(workBookTasks)).toBe(expected);
        },
      );
    });

    function runTests(
      testName: string,
      testCases: TestCasesForWorkBookTasks,
      testFunction: (testCase: TestCaseForWorkBookTasks) => void,
    ) {
      test.each(testCases)(`${testName}(workBookTasks: $workBookTasks)`, testFunction);
    }
  });

  describe('are all tasks accepted using taskResults', () => {
    test('when empty task results are given', () => {
      expect(areAllTasksAccepted([], [])).toBeFalsy();
    });

    describe('when 0 out of 3 are is_ac = true given', () => {
      const testCases: TestCasesForTaskResults = [
        {
          taskResults: taskResultsForUserId2,
        },
      ];

      runTests('areAllTasksAccepted', testCases, ({ taskResults }: TestCaseForTaskResults) => {
        expect(areAllTasksAccepted(taskResults, taskResults)).toBeFalsy();
      });
    });

    describe('when 2 out of 3 are is_ac = true given', () => {
      const testCases: TestCasesForTaskResults = [
        {
          taskResults: taskResultsForUserId3,
        },
      ];

      runTests('areAllTasksAccepted', testCases, ({ taskResults }: TestCaseForTaskResults) => {
        expect(areAllTasksAccepted(taskResults, taskResults)).toBeFalsy();
      });
    });

    describe('when 3 out of 3 are is_ac = true given', () => {
      const testCases: TestCasesForTaskResults = [
        {
          taskResults: taskResultsForUserId4,
        },
      ];

      runTests('areAllTasksAccepted', testCases, ({ taskResults }: TestCaseForTaskResults) => {
        expect(areAllTasksAccepted(taskResults, taskResults)).toBeTruthy();
      });
    });

    describe('when 4 out of 4 are is_ac = true given', () => {
      const testCases: TestCasesForTaskResults = [
        {
          taskResults: taskResultsForUserId5,
        },
      ];

      runTests('areAllTasksAccepted', testCases, ({ taskResults }: TestCaseForTaskResults) => {
        expect(areAllTasksAccepted(taskResults, taskResults)).toBeTruthy();
      });
    });

    function runTests(
      testName: string,
      testCases: TestCasesForTaskResults,
      testFunction: (testCase: TestCaseForTaskResults) => void,
    ) {
      test.each(testCases)(`${testName}(taskResults: $taskResults)`, testFunction);
    }
  });

  describe('are all tasks accepted using WorkBookTaskBase[]', () => {
    test('when empty task results and workbook tasks are given', () => {
      expect(areAllTasksAccepted([], [])).toBeFalsy();
    });

    describe('when 0 out of 3 is is_ac = true task results and 3 workbook tasks are given', () => {
      const testCases: TestCasesForWorkBookTasks = [
        {
          taskResults: taskResultsForUserId2,
          workBookTasks: threeWorkBookTasks,
        },
      ];

      runTests(
        'areAllTasksAccepted',
        testCases,
        ({ taskResults, workBookTasks }: TestCaseForWorkBookTasks) => {
          if (taskResults) {
            expect(areAllTasksAccepted(taskResults, workBookTasks)).toBeFalsy();
          }
        },
      );
    });

    describe('when 2 out of 3 are is_ac = true task results and 3 workbook tasks are given', () => {
      const testCases: TestCasesForWorkBookTasks = [
        {
          taskResults: taskResultsForUserId3,
          workBookTasks: threeWorkBookTasks,
        },
      ];

      runTests(
        'areAllTasksAccepted',
        testCases,
        ({ taskResults, workBookTasks }: TestCaseForWorkBookTasks) => {
          if (taskResults) {
            expect(areAllTasksAccepted(taskResults, workBookTasks)).toBeFalsy();
          }
        },
      );
    });

    describe('when 3 out of 3 are is_ac = true task results and 3 workbook tasks are given', () => {
      const testCases: TestCasesForWorkBookTasks = [
        {
          taskResults: taskResultsForUserId4,
          workBookTasks: threeWorkBookTasks,
        },
      ];

      runTests(
        'areAllTasksAccepted',
        testCases,
        ({ taskResults, workBookTasks }: TestCaseForWorkBookTasks) => {
          if (taskResults) {
            expect(areAllTasksAccepted(taskResults, workBookTasks)).toBeTruthy();
          }
        },
      );
    });

    describe('when 4 out of 4 are is_ac = true task results and 3 workbook tasks are given', () => {
      const testCases: TestCasesForWorkBookTasks = [
        {
          taskResults: taskResultsForUserId5,
          workBookTasks: threeWorkBookTasks,
        },
      ];

      runTests(
        'areAllTasksAccepted',
        testCases,
        ({ taskResults, workBookTasks }: TestCaseForWorkBookTasks) => {
          if (taskResults) {
            expect(areAllTasksAccepted(taskResults, workBookTasks)).toBeFalsy();
          }
        },
      );
    });

    function runTests(
      testName: string,
      testCases: TestCasesForWorkBookTasks,
      testFunction: (testCase: TestCaseForWorkBookTasks) => void,
    ) {
      test.each(testCases)(`${testName}(workBookTasks: $workBookTasks)`, testFunction);
    }
  });

  describe('compare by contest type, contest id and task id', () => {
    describe('when the different contest type tasks are given', () => {
      // Note: Due to the large number of ABC tasks, test cases are prioritized.
      const testCases: TestCasesForSortingTaskResults = [
        {
          first: tasksForVerificationOfOrder.ABS_1,
          second: tasksForVerificationOfOrder.abc999_a,
          expected: -1, // order: ABS_1, abc999_a
        },
        {
          first: tasksForVerificationOfOrder.abc999_a,
          second: tasksForVerificationOfOrder.APG4b_ct,
          expected: -1, // order: abc999_a, APG4b_ct
        },
        {
          first: tasksForVerificationOfOrder.abc999_a,
          second: tasksForVerificationOfOrder.typical90_a,
          expected: -2, // order: abc999_a, typical90_a
        },
        {
          first: tasksForVerificationOfOrder.abc999_a,
          second: tasksForVerificationOfOrder.dp_b,
          expected: -3, // order: abc999_a, dp_b
        },
        {
          first: tasksForVerificationOfOrder.abc999_a,
          second: tasksForVerificationOfOrder.tdpc_contest,
          expected: -4, // order: abc999_a, tpdc_contest
        },
        {
          first: tasksForVerificationOfOrder.abc999_a,
          second: tasksForVerificationOfOrder.past202309_a,
          expected: -5, // order: abc999_a, past202309_a
        },
        {
          first: tasksForVerificationOfOrder.abc999_a,
          second: tasksForVerificationOfOrder.acl_a,
          expected: -6, // order: abc999_a, acl_a
        },
        {
          first: tasksForVerificationOfOrder.abc999_a,
          second: tasksForVerificationOfOrder.joi2023_yo1c,
          expected: -7, // order: abc999_a, joi2023_yo1c
        },
        {
          first: tasksForVerificationOfOrder.abc999_a,
          second: tasksForVerificationOfOrder.tessoku_book_a,
          expected: -8, // order: abc999_a, tessoku_book_a
        },
        {
          first: tasksForVerificationOfOrder.abc999_a,
          second: tasksForVerificationOfOrder.math_and_algorithm_a,
          expected: -9, // order: abc999_a, math_and_algorithm_a
        },
      ];

      runTests(
        'compareByContestIdAndTaskId',
        testCases,
        ({ first, second, expected }: TestCaseForSortingTaskResults) => {
          expect(compareByContestIdAndTaskId(first, second)).toBe(expected);
        },
      );
    });

    describe('when different contests are given for the same contest type', () => {
      const testCases: TestCasesForSortingTaskResults = [
        {
          first: tasksForVerificationOfOrder.abc052_c,
          second: tasksForVerificationOfOrder.abc078_c,
          expected: 1, // order: abc078_c, abc052_c
        },
        {
          first: tasksForVerificationOfOrder.abc052_c,
          second: tasksForVerificationOfOrder.abc361_a,
          expected: 1, // order: abc361_a, abc052_c
        },
        {
          first: tasksForVerificationOfOrder.abc078_c,
          second: tasksForVerificationOfOrder.abc361_a,
          expected: 1, // order: abc361_a, abc078_c
        },
        {
          first: tasksForVerificationOfOrder.abc361_a,
          second: tasksForVerificationOfOrder.abc362_a,
          expected: 1, // order: abc362_a, abc361_a
        },
      ];

      runTests(
        'compareByContestIdAndTaskId',
        testCases,
        ({ first, second, expected }: TestCaseForSortingTaskResults) => {
          expect(compareByContestIdAndTaskId(first, second)).toBe(expected);
        },
      );
    });

    describe('when different contests are given for the same contest type', () => {
      const testCases: TestCasesForSortingTaskResults = [
        {
          first: tasksForVerificationOfOrder.abc347_c,
          second: tasksForVerificationOfOrder.abc347_d,
          expected: -1, // order: abc347_c, abc347_d
        },
        {
          first: tasksForVerificationOfOrder.abc347_d,
          second: tasksForVerificationOfOrder.abc347_e,
          expected: -1, // order: abc347_d, abc347_e
        },
        {
          first: tasksForVerificationOfOrder.abc347_c,
          second: tasksForVerificationOfOrder.abc347_e,
          expected: -1, // order: abc347_c, abc347_e
        },
      ];

      runTests(
        'compareByContestIdAndTaskId',
        testCases,
        ({ first, second, expected }: TestCaseForSortingTaskResults) => {
          expect(compareByContestIdAndTaskId(first, second)).toBe(expected);
        },
      );
    });

    function runTests(
      testName: string,
      testCases: TestCasesForSortingTaskResults,
      testFunction: (testCase: TestCaseForSortingTaskResults) => void,
    ) {
      test.each(testCases)(
        `${testName}(first: $first.task_id, second: $second.task_id)`,
        testFunction,
      );
    }
  });
});
