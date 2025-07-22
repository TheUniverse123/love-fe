import { CozeAPI, ChatStatus, RoleType } from '@coze/api';

const client = new CozeAPI({
    token: 'pat_TX6gLOa3zVM2wNHUbZH8QBQbbGXnaSVKXVs19q6mC6JgWRt9SL3pajKB39LWKVe5',
    baseURL: 'https://api.coze.com',
    allowPersonalAccessTokenInBrowser: true
});

export async function quickChat(message) {
    const v = await client.chat.createAndPoll({
        bot_id: '7514664716472909825',
        additional_messages: [{
            role: RoleType.User,
            content: message,
            content_type: 'text',
        }],
    });
    console.log(v)

    if (v.chat.status === ChatStatus.COMPLETED) {
        let answer = '';
        let suggestions = [];

        for (let i = 0; i < v.messages.length; i++) {
            const item = v.messages[i];
            console.log(item)

            if (i === v.messages.length - 5) {
                // Item thứ 5 từ cuối là câu trả lời
                answer = item.content;
            } else if (i >= v.messages.length - 3) {
                // 3 items cuối là các gợi ý tiếp theo
                suggestions.push(item.content);
            }
        }

        return {
            answer: answer,
            suggestions: suggestions
        };
    }
    return v;
}