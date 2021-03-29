from .app import db

class Employer(db.Model):
    __tablename__ = 'employer'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100))
    jabatan = db.Column(db.String(100))
    gaji = db.Column(db.Integer)

    def __init__(self,nama,jabatan,gaji):
        self.nama = nama
        self.jabatan = jabatan
        self.gaji = gaji

db.create_all()
