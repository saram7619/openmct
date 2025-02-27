/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2023, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
const { test } = require('../../../pluginFixtures');
const { createPlanFromJSON } = require('../../../appActions');
const { addPlanGetInterceptor } = require('../../../helper/planningUtils.js');
const testPlan1 = require('../../../test-data/examplePlans/ExamplePlan_Small1.json');
const testPlanWithOrderedLanes = require('../../../test-data/examplePlans/ExamplePlanWithOrderedLanes.json');
const {
  assertPlanActivities,
  assertPlanOrderedSwimLanes
} = require('../../../helper/planningUtils');

test.describe('Plan', () => {
  let plan;
  test.beforeEach(async ({ page }) => {
    await page.goto('./', { waitUntil: 'domcontentloaded' });
    plan = await createPlanFromJSON(page, {
      json: testPlan1
    });
  });

  test('Displays all plan events', async ({ page }) => {
    await assertPlanActivities(page, testPlan1, plan.url);
  });

  test('Displays plans with ordered swim lanes configuration', async ({ page }) => {
    // Add configuration for swim lanes
    await addPlanGetInterceptor(page);
    // Create the plan
    const planWithSwimLanes = await createPlanFromJSON(page, {
      json: testPlanWithOrderedLanes
    });
    await assertPlanOrderedSwimLanes(page, testPlanWithOrderedLanes, planWithSwimLanes.url);
  });
});
