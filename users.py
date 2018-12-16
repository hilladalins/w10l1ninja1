from bottle import route, run, request, static_file, template, response
import json


users_list = []


@route('/')
def index():
    return template("static/html/index.html")


@route('/js/<filename:re:.*\.js>', method='GET')
def javascripts(filename):
    return static_file(filename, root='static/js')


@route('/addUser', method="POST")
def post_user():
    user = {"name": request.json.get("name")}
    if user in users_list:
        response.status = 404
        response.content_type = 'application/json'
        return json.dumps({'error': 'user name already exists'})
    users_list.append(user)
    response.status = 201
    response.content_type = 'application/json'
    return json.dumps({'success': 'user had been added successfully'})


@route('/deleteUser', method="DELETE")
def delete_user():
    user = {"name": request.json.get("name")}
    if user in users_list:
        users_list.remove(user)
        response.status = 204
        response.content_type = 'application/json'
        return json.dumps({'success': 'user had been deleted successfully'})
    response.status = 400
    response.content_type = 'application/json'
    return json.dumps({'error': "user name doesn't exist"})


@route('/getUsers')
def get_users():
    return json.dumps(users_list)


def main():
    run(host='localhost', port=7000)


if __name__ == '__main__':
    main()
