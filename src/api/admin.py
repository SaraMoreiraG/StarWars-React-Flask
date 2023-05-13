import os
from flask_admin import Admin
from .models import db, People, Planets, User, Favorites
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class MyModel(ModelView):
        column_display_pk = True

    admin.add_view(MyModel(People, db.session))
    admin.add_view(MyModel(Planets, db.session))
    admin.add_view(MyModel(User, db.session))
    admin.add_view(MyModel(Favorites, db.session))
