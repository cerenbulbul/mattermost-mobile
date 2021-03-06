// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {Alert, Linking, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {intlShape} from 'react-intl';

import {makeStyleSheetFromTheme} from 'app/utils/theme';
import Markdown from 'app/components/markdown';

export default class AttachmentTitle extends PureComponent {
    static propTypes = {
        link: PropTypes.string,
        theme: PropTypes.object.isRequired,
        value: PropTypes.string,
    };

    static contextTypes = {
        intl: intlShape.isRequired,
    };

    openLink = () => {
        const {link} = this.props;
        const {intl} = this.context;

        if (link) {
            Linking.openURL(link).catch(() => {
                Alert.alert(
                    intl.formatMessage({
                        id: 'mobile.link.error.title',
                        defaultMessage: 'Error',
                    }),
                    intl.formatMessage({
                        id: 'mobile.link.error.text',
                        defaultMessage: 'Unable to open the link.',
                    }),
                );
            });
        }
    };

    render() {
        const {
            link,
            value,
            theme,
        } = this.props;

        if (!value) {
            return null;
        }

        const style = getStyleSheet(theme);

        let title;
        if (link) {
            title = (
                <Text
                    style={[style.title, Boolean(link) && style.link]}
                    onPress={this.openLink}
                >
                    {value}
                </Text>
            );
        } else {
            title = (
                <Markdown
                    isEdited={false}
                    isReplyPost={false}
                    disableHashtags={true}
                    disableAtMentions={true}
                    disableChannelLink={true}
                    disableGallery={true}
                    autolinkedUrlSchemes={[]}
                    mentionKeys={[]}
                    theme={theme}
                    value={value}
                    baseTextStyle={style.title}
                    textStyles={{link: style.link}}
                />
            );
        }

        return (
            <View style={style.container}>
                {title}
            </View>
        );
    }
}

const getStyleSheet = makeStyleSheetFromTheme((theme) => {
    return {
        container: {
            marginTop: 3,
            flex: 1,
            flexDirection: 'row',
        },
        title: {
            color: theme.centerChannelColor,
            fontWeight: '600',
            marginBottom: 5,
            fontSize: 14,
            lineHeight: 20,
        },
        link: {
            color: theme.linkColor,
        },
    };
});
