---
author: tim
comments: true
date: 2012-08-17 15:49:55+00:00
dsq_thread_id: '809062276'
layout: post
link: ''
slug: adding-done-and-cancel-buttons-to-an-ios-number-pad
title: Adding Done and Cancel buttons to an iOS number pad
wordpress_id: 1147
category: Code
tags:
- ios
- ipad
- iphone
- objective c
- xcode
---

There are some cases when you may want to have a "Done" or "Cancel" button on
an iOs number pad when editing a text field. This doesn't come by default, but
is easy to add. See the example snippets below, or check out the code on
[github](https://github.com/broderboy/iphone-DoneCancelNumberPadToolbar).

[![](/images/2012/08/Done-Cancel-Iphone.png)](/images/2012/08/Done-Cancel-Iphone.png)

Sample Usage:

```c
//In the view controller that's going ot use the component, put this in the header after the class being extended.
<DoneCancelNumberPadToolbarDelegate>
 
// Then instantiate your toolbar component where it's needed
DoneCancelNumberPadToolbar *toolbar = [[DoneCancelNumberPadToolbar alloc] initWithTextField:textField];
toolbar.delegate = self;
textField.inputAccessoryView = toolbar;
 
// Finally, implement the following two delegate methods
 
#pragma mark - DoneCancelNumberpadToolbar delegate
-(void)doneCancelNumberPadToolbarDelegate:(DoneCancelNumberPadToolbar *)controller didClickDone:(UITextField *)textField
{
    NSLog(@&quot;%@&quot;, textField.text);
}
 
-(void)doneCancelNumberPadToolbarDelegate:(DoneCancelNumberPadToolbar *)controller didClickCancel:(UITextField *)textField
{
    NSLog(@&quot;Canceled: %@&quot;, [textField description]);
}
```

DoneCancelNumberPadToolbar.h

```
#import <UIKit/UIKit.h>

@class DoneCancelNumberPadToolbar;

@protocol DoneCancelNumberPadToolbarDelegate <NSObject>

-(void)doneCancelNumberPadToolbarDelegate:(DoneCancelNumberPadToolbar *)controller didClickDone:(UITextField *)textField;
-(void)doneCancelNumberPadToolbarDelegate:(DoneCancelNumberPadToolbar *)controller didClickCancel:(UITextField *)textField;

@end

@interface DoneCancelNumberPadToolbar : UIToolbar
{
    UITextField* textField;
}
```

DoneCancelNumberPadToolbar.m

```c
#import &quot;DoneCancelNumberPadToolbar.h&quot;

@implementation DoneCancelNumberPadToolbar

@synthesize delegate;

- (id) initWithTextField:(UITextField *)aTextField
{
    self = [super initWithFrame:CGRectMake(0, 0, 320, 50)];
    if (self) {
        textField = aTextField;
        self.barStyle = UIBarStyleBlackTranslucent;
        self.items = [NSArray arrayWithObjects:
                      [[UIBarButtonItem alloc]initWithTitle:@&quot;Cancel&quot;
                                                      style:UIBarButtonItemStyleBordered
                                                     target:self
                                                     action:@selector(cancelNumberPad)],
                      [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace
                                                                   target:nil action:nil],
                      [[UIBarButtonItem alloc]initWithTitle:@&quot;Done&quot;
                                                      style:UIBarButtonItemStyleDone
                                                     target:self
                                                     action:@selector(doneWithNumberPad)],
                      nil];
        [self sizeToFit];
        
    }
    return self;
}

-(void)cancelNumberPad
{
    [textField resignFirstResponder];
    textField.text = @&quot;&quot;;
    [self.delegate doneCancelNumberPadToolbarDelegate:self didClickCancel:textField];
}

-(void)doneWithNumberPad
{
    [textField resignFirstResponder];
    [self.delegate doneCancelNumberPadToolbarDelegate:self didClickDone:textField];
}
@end

@property (nonatomic, weak) id <DoneCancelNumberPadToolbarDelegate> delegate;

- (id) initWithTextField:(UITextField *)textField;

@end
``` 

Special thanks to [akozl
ik](http://www.reddit.com/r/iOSProgramming/comments/ydrzv/adding_done_and_canc
el_buttons_to_an_ios_number/c5v4rpt) for the help with delegates.