export type CommonPropertyOptions = {
  /**
   * Property name
   */
  name?: string;

  /**
   * Property description
   */
  description?: string;

  /**
   * Mark the property as required
   */
  required?: boolean;

  /**
   * When set true, the property value can be passed as string value
   */
  parseString?: boolean;

  /**
   * Determines the property is exposed after transform or not. By default it is `true`
   */
  expose?: boolean;

  /**
   * Property name to check the property's value is not equal to the value of that property
   */
  notEqualToProperty?: string;

  /**
   * Property name to check the property's value is  equal to the value of that property
   */
  equalToProperty?: string;
};
