"""added about, needs

Revision ID: 482ba9f11ab6
Revises: f4d86f030b35
Create Date: 2024-08-03 13:12:44.447710

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '482ba9f11ab6'
down_revision = 'f4d86f030b35'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('about', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('needs', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('needs')
        batch_op.drop_column('about')

    # ### end Alembic commands ###
