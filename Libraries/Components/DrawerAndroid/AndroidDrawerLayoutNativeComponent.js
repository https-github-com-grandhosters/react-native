/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

import type {ViewProps} from 'react-native/build/Components/View/ViewPropTypes';
import type {ColorValue} from 'react-native/build/StyleSheet/StyleSheetTypes';
import type {
  WithDefault,
  DirectEventHandler,
  Int32,
  Float,
} from 'react-native/build/Types/CodegenTypes';
import codegenNativeCommands from 'react-native/build/Utilities/codegenNativeCommands';
import codegenNativeComponent from 'react-native/build/Utilities/codegenNativeComponent';
import * as React from 'react';

type DrawerStateEvent = $ReadOnly<{|
  drawerState: Int32,
|}>;

type DrawerSlideEvent = $ReadOnly<{|
  offset: Float,
|}>;

interface NativeCommands {
  +openDrawer: (viewRef: React.Ref<'AndroidDrawerLayout'>) => void;
  +closeDrawer: (viewRef: React.Ref<'AndroidDrawerLayout'>) => void;
}

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  /**
   * Determines whether the keyboard gets dismissed in response to a drag.
   *   - 'none' (the default), drags do not dismiss the keyboard.
   *   - 'on-drag', the keyboard is dismissed when a drag begins.
   */
  keyboardDismissMode?: WithDefault<'none' | 'on-drag', 'none'>,

  /**
   * Specifies the background color of the drawer. The default value is white.
   * If you want to set the opacity of the drawer, use rgba. Example:
   *
   * ```
   * return (
   *   <DrawerLayoutAndroid drawerBackgroundColor="rgba(0,0,0,0.5)">
   *   </DrawerLayoutAndroid>
   * );
   * ```
   */
  drawerBackgroundColor: ColorValue,

  /**
   * Specifies the side of the screen from which the drawer will slide in.
   */
  drawerPosition?: WithDefault<'left' | 'right', 'left'>,

  /**
   * Specifies the width of the drawer, more precisely the width of the view that be pulled in
   * from the edge of the window.
   */

  drawerWidth?: ?Float,

  /**
   * Specifies the lock mode of the drawer. The drawer can be locked in 3 states:
   * - unlocked (default), meaning that the drawer will respond (open/close) to touch gestures.
   * - locked-closed, meaning that the drawer will stay closed and not respond to gestures.
   * - locked-open, meaning that the drawer will stay opened and not respond to gestures.
   * The drawer may still be opened and closed programmatically (`openDrawer`/`closeDrawer`).
   */
  drawerLockMode?: WithDefault<
    'unlocked' | 'locked-closed' | 'locked-open',
    'unlocked',
  >,

  /**
   * Function called whenever there is an interaction with the navigation view.
   */
  onDrawerSlide?: ?DirectEventHandler<DrawerSlideEvent>,

  /**
   * Function called when the drawer state has changed. The drawer can be in 3 states:
   * - Idle, meaning there is no interaction with the navigation view happening at the time
   * - Dragging, meaning there is currently an interaction with the navigation view
   * - Settling, meaning that there was an interaction with the navigation view, and the
   * navigation view is now finishing its closing or opening animation
   */
  onDrawerStateChanged?: ?DirectEventHandler<DrawerStateEvent>,

  /**
   * Function called whenever the navigation view has been opened.
   */
  onDrawerOpen?: ?DirectEventHandler<null, 'topDrawerOpened'>,

  /**
   * Function called whenever the navigation view has been closed.
   */
  onDrawerClose?: ?DirectEventHandler<null, 'topDrawerClosed'>,

  /**
   * Make the drawer take the entire screen and draw the background of the
   * status bar to allow it to open over the status bar. It will only have an
   * effect on API 21+.
   */
  statusBarBackgroundColor?: ?ColorValue,
|}>;

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['openDrawer', 'closeDrawer'],
});

export default codegenNativeComponent<NativeProps>('AndroidDrawerLayout');
