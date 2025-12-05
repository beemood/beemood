import * as helpers from '../helpers/extract-resource-name.js';
import {
  RequiredMethodPermissions,
  RequiredResourcePermissions,
} from '../metadata/required-permissions.js';
import * as metadata from '../metadata/resource-name.js';
import { ResourceController } from './resource-controller.js';
import { ResourceMethod } from './resource-methods.js';

const extractResourceName = vi.spyOn(helpers, 'extractResourceName');
const ResouceName = vi.spyOn(metadata, 'ResourceName');

describe('ResourceController', () => {
  @RequiredResourcePermissions([])
  @ResourceController('samples')
  class SampleController {
    @RequiredMethodPermissions([])
    @ResourceMethod()
    find() {
      //
    }
  }

  it('should set the resource name metadata', () => {
    expect(ResouceName).toHaveBeenCalledExactlyOnceWith('Sample');
  });

  it('should extract the resouce name', () => {
    expect(extractResourceName).toHaveBeenCalledExactlyOnceWith(
      SampleController.name
    );
  });
});
