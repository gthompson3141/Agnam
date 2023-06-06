from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here.

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    fullName = models.CharField(max_length=120, blank=True, null=True)
    email = models.CharField(max_length=120)
    password = models.CharField(max_length=120)

    # # Encryt the passwords before you store them into persistent layer - SC 04/03/2022
    # def save(self, *arg, **kwargs):
    #     self.password = make_password(self.password, salt='7henRK5NTDyrT7NpEWv6Zg==', hasher='pbkdf2_sha1')
    #     super(User, self).save(*arg, *kwargs)

    def _str_(self):
        return self.Title

