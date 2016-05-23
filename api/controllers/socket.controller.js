// 在Apache Thrift处理完成后,Socket作为中间件负责处理消息的接收与发送

// 由客户端发出数据的后续处理方法
export function clientDataHandle(socket, data) {
}
//已处理完成的信息回发
function returnResultHandle(socket, data) {
    socket.emit('new result', {
        message: "Server Response=>" + socket.client.id,
        data: data
    });
}