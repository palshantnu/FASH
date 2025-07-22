import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Upvotedownvote from "../../src/Upvotedownvote.web";

jest.useFakeTimers()
const screenProps = {
    navigation: {
    },
    id: "Upvotedownvote"
}

const feature = loadFeature('./__tests__/features/Upvotedownvote-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Upvotedownvote', ({ given, when, then }) => {
        let UpvotedownvoteWrapper:ShallowWrapper;
        let instance:Upvotedownvote; 

        given('I am a User loading Upvotedownvote', () => {
            UpvotedownvoteWrapper = shallow(<Upvotedownvote { ...screenProps }/>)
        });

        when('I navigate to the Upvotedownvote', () => {
             instance = UpvotedownvoteWrapper.instance() as Upvotedownvote
        });

        then('Upvotedownvote will load with out errors', async () => {
            const successResponse = {"id":"RestAPIResponceMessage","properties":{"RestAPIResponceDataMessage":"ae5188ab-3f56-42a3-a97e-b75fe082171b","RestAPIResponceSuccessMessage":{"status":"downvote"}},"messageId":"a6ce7bbf-81cd-4e95-8f75-b029711e7f51"};
            const requestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            requestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage.messageId);
            requestMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
                successResponse
            );
            instance.checkVoteStatusApiCallId = requestMessage.messageId
            runEngine.sendMessage("Unit Test", requestMessage)

            expect(UpvotedownvoteWrapper).toBeTruthy()
        });

        then('I can press the like button without errors', () => {
            let buttonComponent = UpvotedownvoteWrapper.findWhere((node) => node.prop('data-testid') === 'likeBtn');
            buttonComponent.simulate('click')

            const successResponse = {"id":"RestAPIResponceMessage","properties":{"RestAPIResponceDataMessage":"5d68e4ae-a4f3-4ddb-a4fc-726273c67e71","RestAPIResponceSuccessMessage":{"data":{"id":"2073","type":"like","attributes":{"likeable_id":500,"likeable_type":"BxBlockPosts::Post","like_by_id":167,"created_at":"2022-12-22T20:55:56.912+05:30","updated_at":"2022-12-22T20:55:56.912+05:30"}}}},"messageId":"ce7e6a20-abd2-4cd6-af91-7d20ffab64f2"};
            const requestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            requestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage.messageId);
            requestMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
                successResponse
            );
            instance.upvotePostApiCallId = requestMessage.messageId
            runEngine.sendMessage("Unit Test", requestMessage)

        });

        then('I can press the dislike button without errors', () => {
            let buttonComponent = UpvotedownvoteWrapper.findWhere((node) => node.prop('data-testid') === 'disLikeBtn');
            buttonComponent.simulate('click')

            const successResponse = {"id":"RestAPIResponceMessage","properties":{"RestAPIResponceDataMessage":"e32aa65a-f080-4f68-b86d-931dfb36c763","RestAPIResponceSuccessMessage":{"data":{"id":"1011","type":"dislike","attributes":{"dislikeable_id":500,"dislike_by_id":167,"created_at":"less than a minute ago","updated_at":"2022-12-22T20:57:01.354+05:30"}}}},"messageId":"b2770313-bd6b-442c-a2f9-75b60ff979e9"};
            const requestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            requestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage.messageId);
            requestMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
                successResponse
            );
            instance.downvotePostApiCallId = requestMessage.messageId
            runEngine.sendMessage("Unit Test", requestMessage)

        });

        then("Update state correctly on handleLike",async () => {
            instance.setState({ liked: false, _upvote: 0, disliked: true, _downvote: 1 });
            await instance.handleLike();
            expect(UpvotedownvoteWrapper.instance().state).toEqual({ 
                _downvote: 0,
                _upvote: 0,
                disliked: false,
                liked: false,
                enableField: false,
                token: "",
                txtInputValue: "",
                txtSavedValue: "A"
             });
        })

        then("Update state correctly on handlDisLike", async () => {
            instance.setState({ liked: false, _upvote: 0, disliked: true, _downvote: 1 });
            await instance.handleDislike();
            expect(UpvotedownvoteWrapper.instance().state).toEqual({ 
                _downvote: 0,
                _upvote: 0,
                disliked: false,
                liked: false,
                enableField: false,
                token: "",
                txtInputValue: "",
                txtSavedValue: "A"
             });
        })

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(UpvotedownvoteWrapper).toBeTruthy()
        });
    });
});
